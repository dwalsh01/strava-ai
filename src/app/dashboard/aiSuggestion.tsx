import ReactMarkdown from 'react-markdown'

interface AiSuggestionProps {
  suggestion: string | null
}

export default function AiSuggestion({ suggestion }: AiSuggestionProps) {
  return (
    <div className="w-2/3 bg-gray-900 p-8 rounded-md">
      <h3 className="text-xl font-bold text-white">AI Suggestion</h3>
      {suggestion ? (
        <ReactMarkdown>{suggestion}</ReactMarkdown>
      ) : (
        <p className="text-gray-400">Loading...</p>
      )}
    </div>
  )
}
