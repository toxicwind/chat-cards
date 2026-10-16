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
					content: '# Welcome to Chat Cards Pattern Forge\n\nInteractive card deck for GitHub Copilot canvas with pattern-forge integration.',
					actions: []
				};
			case 'pattern-outline':
				return {
					type: 'numbered-outline',
					content: '1. Pattern Discovery\n2. Pattern Instantiation\n3. Pattern Composition\n4. Pattern Application\n5. Pattern Library Management',
					actions: []
				};
			case 'pattern-table':
				return {
					type: 'table',
					content: '| Pattern Type | Description |\n|--------------|-------------|\n| Creational | Singleton, Factory, Builder patterns |\n| Structural | Adapter, Decorator, Facade patterns |\n| Behavioral | Observer, Strategy, Command patterns |\n| Architectural | MVC, Microservices, Layered patterns |\n| Domain-specific | Data access, API gateway patterns |',
					actions: []
				};
			case 'pattern-form':
				return {
					type: 'form',
					content: 'Instantiate a Pattern\n\nPattern Type: [dropdown]\nParameters: [dynamic form based on pattern]\nTarget Location: [file path picker]\n[Instantiate Pattern] [Preview]',
					actions: [
					{
						type: 'button',
						label: 'Instantiate Pattern',
						id: 'instantiate-pattern'
					},
					{
						type: 'button',
						label: 'Preview',
						id: 'preview-pattern'
					}
				]
				};
			case 'pattern-visualization':
				return {
					type: 'markdown',
					content: '# Pattern Visualization\n\n![Pattern Diagram](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRkZGIiBzdHJva2U9IiMwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMTEwIiB5PSI0MCI+U2luZ2xldG9uPC90ZXh0Pjwvc3ZnPg==)\n\n*Click to configure pattern parameters*',
					actions: [
					{
						type: 'button',
						label: 'Configure Pattern',
						id: 'configure-pattern'
					}
				]
				};
			case 'pattern-applied':
				return {
					type: 'markdown',
					content: '# Pattern Applied Successfully\n\nThe Singleton pattern has been applied to \`src/services/UserService.ts\`\n\n\`\`\`typescript\nclass UserService {\n  private static instance: UserService;\n\n  private constructor() {}\n\n  public static getInstance(): UserService {\n    if (!UserService.instance) {\n      UserService.instance = new UserService();\n    }\n    return UserService.instance;\n  }\n\n  // ... rest of the class\n}\n\`\`\`\n\n[View Diff] [Apply Another Pattern]',
					actions: [
					{
						type: 'button',
						label: 'View Diff',
						id: 'view-diff'
					},
					{
						type: 'button',
						label: 'Apply Another Pattern',
						id: 'apply-another'
					}
				]
				};
			case 'skills-list':
				return {
					type: 'table',
					content: '| Skill | Cluster | Description |\n|-------|---------|-------------|\n| pattern-forge | 04_code_intelligence | AST call-graphs, BM25 retrieval & SWE engines |\n| router | 01_orchestration | Root routing & container bootstrap |\n| context7 | 02_research_intel | Documentation & code examples |\n| exa | 02_research_intel | Web search & intelligence |\n| github | 02_research_intel | GitHub integration |\n| huggingface | 02_research_intel | ML models & datasets |\n| pr-review | 04_code_intelligence | Pull request review automation |\n| repo-audit | 04_code_intelligence | Repository audit & analysis |',
					actions: []
				};
			case 'skills-stats':
				return {
					type: 'markdown',
					content: '# Skills Hub Registry Metrics\n\n| Metric | Value |\n|--------|-------|\n| Total Skills | 153 |\n| Staged | 153 |\n| Clusters | 6 + Inbox |\n| SKILL.md Coverage | 153/153 |\n| Tests | 12/12 |\n| Telemetry | 0% (Air-gapped) |\n| License | Apache-2.0 |\n| Root | /home/toxic/estate/skills-hub |',
					actions: []
				};
			case 'skills-route':
				return {
					type: 'form',
					content: '# Route Query to Skills Hub\n\nEnter a task or question to find relevant skills:\n\nQuery: [text input]\n[Route]',
					actions: [
					{
						type: 'button',
						label: 'Route',
						id: 'route-query'
					}
				]
				};
			default:
				return undefined;
		}
	}
}