import React from 'react';
import PageHeader from '../../common/widget/PageHeader';
import PageContent from '../../common/widget/PageContent';

class Teste extends React.Component {

    render(){
        return (
            <React.Fragment>
                <PageHeader title="Página Teste" description="Esta é a nossa página de teste da aplicação"/>

                <PageContent>
                    <h2>Página de teste</h2>
                </PageContent>       
            </React.Fragment>
        )
    }
}

export default Teste;
