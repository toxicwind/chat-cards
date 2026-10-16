import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Register the chat cards provider
	const provider = new ChatCardsProvider();
	vscode.chat.registerChatCardProvider('chat-cards', provider);

	// Provide a command to open the card deck
	let disposable = vscode.commands.registerCommand('chat-cards.openDeck', () => {
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: 'Opening Chat Cards Deck',
			cancellable: false
		}, async () => {
			// Send a message to open the card deck
			vscode.chat.postMessage('open-chat-cards-deck');
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(provider);
}

export function deactivate() {}

class ChatCardsProvider implements vscode.ChatCardProvider {
	async provideChatCard(item: vscode.ChatCardItem, token: vscode.CancellationToken): Promise<vscode.ChatCard | undefined> {
		switch (item.id) {
			case 'welcome':
				return {
					type: 'markdown',
					content: '# Welcome to Chat Cards\n\nInteractive card deck for GitHub Copilot canvas.',
					actions: []
				};
			case 'outline':
				return {
					type: 'numbered-outline',
					content: '1. Welcome\n2. Features\n3. Usage\n4. License',
					actions: []
				};
			case 'table':
				return {
					type: 'table',
					content: '| Feature | Description |\n|---------|-------------|\n| Tab boxes | Interactive tabbed sections |\n| SVG charts | Visual chart representations |\n| Forms | Two-way data collection |\n| Markdown | Rendered documents |\n| Video clips | Short video content |',
					actions: []
				};
			default:
				return undefined;
		}
	}
}