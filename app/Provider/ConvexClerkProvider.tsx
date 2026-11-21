'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { ReactNode } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

const ConvexClerkProvider = ({ children }: { children: ReactNode }) => (
  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string} appearance={{
    options: { 
      socialButtonsVariant: 'iconButton',
      logoImageUrl: '/icon/logo-icon.svg'
    },
    variables: {
      colorBackground: "#15171c",
      colorPrimary: "#a3e635",
      colorPrimaryForeground: "#000000",
      colorForeground: "white",
      colorInput: "#1b1f29",
      colorInputForeground: "white",
    },

    elements: {
  
    socialButtonsIconButton: {
      borderRadius: "9999px",
      backgroundColor: "#1b1f29",
      border: "1px solid #2a2f3a",
      "&:hover": {
      backgroundColor: "#252a36",
        },
     },
    
    formFieldInput: {
      borderRadius: "9999px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
   
    formButtonPrimary: {
      borderRadius: "9999px",
    },
  }
     
  }}>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth} >
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>
);

export default ConvexClerkProvider;