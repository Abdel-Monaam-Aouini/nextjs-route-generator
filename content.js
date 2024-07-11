module.exports.page = (route) => `import React from 'react';

const Page = () => {
  return (<div>Welcome to ${route} page</div>);
};

export default Page;`;

module.exports.layout = (layout, route) => `import React ${
  layout === "tsx" ? ", {ReactNode}" : ""
} from 'react';

const Layout = ({ children }${
  layout === "tsx" ? ": {children: ReactNode}" : ""
}) => {
  return (
    <div>
      <h1>Layout for ${route}</h1>
      {children}
    </div>
    );
};

export default Layout;`;

module.exports.routeContent = (
  route
) => `import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ route: "${route}" });
};`;
