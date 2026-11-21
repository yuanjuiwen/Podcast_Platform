import { SignUp } from '@clerk/nextjs'
import { Suspense } from "react";
import React from 'react'

const SignUpPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
              <SignUp />
      </Suspense>
    </div>
  )
}

export default SignUpPage