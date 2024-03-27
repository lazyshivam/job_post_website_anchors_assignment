import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { AlertCircle } from "lucide-react"


export function AlertComponent(props) {
  const { type, message } = props;
  console.log(type, message,"Alert is triggered")
  return (
    <Alert variant={type}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}
