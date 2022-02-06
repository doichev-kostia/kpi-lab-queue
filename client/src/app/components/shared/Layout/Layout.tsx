import React from 'react';

interface Props {
    header: React.ReactNode,
    content: React.ReactNode
}

const Layout: React.FC<Props> = ({header, content}): JSX.Element => {
    return (
        <>
            {header}
            <main>
                {content}
            </main>
        </>
    );
};

export default Layout;