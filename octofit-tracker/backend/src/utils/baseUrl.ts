const PORT = 8000;

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${PORT}.app.github.dev`;
  }

  return `http://localhost:${PORT}`;
}
