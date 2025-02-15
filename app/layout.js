import "./globals.css";
import { ClerkProvider} from "@clerk/nextjs";
import { Metadata } from 'next';


export const metadata = {
  title: "Expense Tracker Software - Track your expenses easily",
  description: "Expense Tracker Software is a web application that helps you track your expenses easily. It allows you to add, edit, delete and view your expenses. It also provides a summary of your expenses.",
  keywords: "expense tracker, expense tracking software, track expenses, personal finance, budgeting, expense management",
  authors: "Sagar Shah",
  creator: "Sagar Shah",
  publisher: "Sagar Shah",
  openGraph: {
    title: "Expense Tracker Software",
    description: "Expense Tracker Software is a web application that helps you track your expenses easily. It allows you to add, edit, delete and view your expenses. It also provides a summary of your expenses.",
    images: [
      {
        url: '/Expense-tracker.png',
        width: 1200,
        height: 630,
        alt: 'Expense Tracker Software',
      },
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'Expense Tracker Software',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Expense Tracker Software",
    description: "Expense Tracker Software is a web application that helps you track your expenses easily. It allows you to add, edit, delete and view your expenses. It also provides a summary of your expenses.",
    creator: '@_sagar__1108',
    images: [
      {
        url: '/Expense-tracker.png',
      },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

