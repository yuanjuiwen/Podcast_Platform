import { SignIn } from '@clerk/nextjs'
import { Suspense } from "react";
import React from 'react'

const SignInPage = () => {
  return (
    <div >
      <Suspense fallback={null}>
        <SignIn />
      </Suspense>
    </div>
  )
}

export default SignInPage