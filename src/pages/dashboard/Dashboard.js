import React from 'react';
import PageHeader from '../../common/widget/PageHeader';
import PageContent from '../../common/widget/PageContent';


class Dashboard extends React.Component {

    render(){
        return (
            <React.Fragment>
                <PageHeader 
                    title="Basic form" 
                    breadcrumb={[{name: 'Home', href: '/teste'}, {name: 'Dashboard'}]}
                    description="Páginas de formulário são usadas para coletar e verificar as informações dos usuários e formulários básicos são comuns nos cenários onde existem alguns formatos de informações." />

                <PageContent>
                    <p>Conteúdo</p>
                </PageContent>                
            </React.Fragment>
        )
    }
}

export default Dashboard;
