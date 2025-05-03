import ReactMarkdown from 'react-markdown'

interface AiSuggestionProps {
  suggestion: string | null
}

export default function AiSuggestion({ suggestion }: AiSuggestionProps) {
  return (
    <div className="w-full p-8 min-h-8 rounded-md bg-white">
      <h3 className="text-xl font-bold text-gray-900 pb-2">AI Suggestion</h3>
      {suggestion ? (
        <div className="prose-sm">
          <ReactMarkdown>{suggestion}</ReactMarkdown>
        </div>
      ) : (
        <div className="h-16 bg-gray-200 animate-pulse rounded-md"></div>
      )}
    </div>
  )
}
