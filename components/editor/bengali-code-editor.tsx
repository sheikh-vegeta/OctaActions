"use client"

import { useEffect, useRef } from "react"
import * as monaco from "monaco-editor"
import { useTheme } from "next-themes"

interface BengaliCodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  theme?: string
}

export function BengaliCodeEditor({ value, onChange, language = "javascript", theme = "vs-dark" }: BengaliCodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const { theme: appTheme } = useTheme()

  useEffect(() => {
    if (editorRef.current) {
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: theme,
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        fontSize: 16,
        fontFamily: "'Li Ador Noirrit', 'Anek Bangla', sans-serif",
        tabSize: 2,
        wordWrap: "on",
        lineNumbers: "on",
        glyphMargin: true,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        padding: {
          top: 15,
          bottom: 15,
        },
      })

      monacoEditorRef.current.onDidChangeModelContent(() => {
        onChange(monacoEditorRef.current?.getValue() || "")
      })

      return () => {
        monacoEditorRef.current?.dispose()
      }
    }
  }, [])

  useEffect(() => {
    if (monacoEditorRef.current) {
      if (monacoEditorRef.current.getValue() !== value) {
        monacoEditorRef.current.setValue(value)
      }
    }
  }, [value])

  useEffect(() => {
    if (monacoEditorRef.current) {
      monaco.editor.setModelLanguage(monacoEditorRef.current.getModel()!, language)
    }
  }, [language])

  useEffect(() => {
    let editorTheme = "vs-dark"

    if (appTheme === "light") {
      editorTheme = "vs"
    } else if (appTheme === "dark") {
      editorTheme = "vs-dark"
    } else if (appTheme === "ayu") {
      editorTheme = "ayu-dark"
    } else if (appTheme === "andromeda") {
      editorTheme = "andromeda"
    }

    monaco.editor.setTheme(editorTheme)
  }, [appTheme])

  return <div ref={editorRef} className="h-full w-full font-bangla" />
}
