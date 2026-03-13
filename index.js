import express from 'express';
import { write } from 'node:fs';

const host = '0.0.0.0';
const porta = 4090;

const app = express();

var listacadastro = [];

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Menu do sistema</title>

                <link 
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" 
                    rel="stylesheet"
                >
            </head>

            <body>`);
    res.write(`
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Menu</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Cadastro
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/cadastro">Cadastro</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="/listacadastro">Lista de cadastrados</a></li>
                        
                    </ul>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/login">Sair</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar"/>
                    <button class="btn btn-outline-success" type="submit">Buscar</button>
                </form>
                </div>
            </div>
            </nav>
        `);
    
    res.write(`
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </html>`);
    res.end();
});

app.get("/cadastro", (requisicao, resposta) => {
    resposta.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Formulario de cadastro</title>

                <link 
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" 
                    rel="stylesheet"
                >
            </head>

            <body>
                <div class="container mt-5">

                    <form method="POST" action="/cadastro" class="row g-3 border p-3 align-items-center">
                        <legend>
                            <h3>Cadastro de empresas</h3>
                        </legend>

                        <div class="col-md-6">
                            <label for="cnpj" class="form-label">CNPJ</label>
                            <input type="text" class="form-control" id="cnpj" name="cnpj">
                        </div>

                        <div class="col-md-6">
                            <label for="razao" class="form-label">Razao Social</label>
                            <input type="text" class="form-control" id="razao" name="razao">
                        </div>



                        <div class="col-12">
                            <label for="fantasia" class="form-label">Nome Fantasia</label>
                            <input type="text" class="form-control" id="fantasia" name="fantasia" placeholder="Loja preco baixo">
                        </div>

                        <div class="col-12">
                            <label for="endereço" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" name="endereco" placeholder="Rua Presidente Vargas, 123">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Cidade</label>
                            <input type="text" id="cidade" name="cidade" class="form-control">
                        </div>

                        <div class="col-md-4">
                            <label for="estado" class="form-label">Estado</label>
                            <select name="estado" class="form-select">
                                <option selected>Selecione...</option>
                                <option>AC</option>
                                <option>AL</option>
                                <option>AP</option>
                                <option>AM</option>
                                <option>BA</option>
                                <option>CE</option>
                                <option>DF</option>
                                <option>ES</option>
                                <option>GO</option>
                                <option>MA</option>
                                <option>MT</option>
                                <option>MS</option>
                                <option>MG</option>
                                <option>PA</option>
                                <option>PB</option>
                                <option>PR</option>
                                <option>PE</option>
                                <option>PI</option>
                                <option>RJ</option>
                                <option>RN</option>
                                <option>RS</option>
                                <option>RO</option>
                                <option>RR</option>
                                <option>SC</option>
                                <option>SP</option>
                                <option>SE</option>
                                <option>TO</option>
                            </select>
                        </div>

                        <div class="col-md-2">
                            <label for="CEP" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="CEP" name="CEP">
                        </div>

                        <div class="col-12">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="exemplo@exemplo.com">
                        </div>

                        <div class="col-12">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="text" class="form-control" id="telefone" name="telefone" placeholder="(xx) xxxxx-xxxx">
                        </div>

       

                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">
                                CADASTRAR
                            </button>
                            <a button type="submit" class="btn btn-primary" href="/">
                                VOLTAR
                            </button></a>
                        </div>

                    </form>

                </div>

            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);

    resposta.end();
});

app.post("/cadastro", (requisicao, resposta) => {
    

    
    const cnpj = requisicao.body.cnpj; 
    const razao = requisicao.body.razao;
    const fantasia = requisicao.body.fantasia;
    const endereco = requisicao.body.endereco; 
    const cidade = requisicao.body.cidade;
    const estado = requisicao.body.estado;
    const CEP = requisicao.body.CEP;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;
    
    //impedir cadastro vazio

    if(!cnpj || !razao || !fantasia || !endereco || !cidade || !estado || !CEP || !email || !telefone){
        // mandar mensagem de erro reenviando o formulario html
        let html = `
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Formulario de cadastro</title>

                <link 
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" 
                    rel="stylesheet"
                >
            </head>

            <body>
                <div class="container mt-5">

                    <form method="POST" action="/cadastro" class="row g-3 border p-3 align-items-center">
                        <legend>
                            <h3>Cadastro</h3>
                        </legend>

                        <div class="col-md-6">
                            <label for="nome" class="form-label">CNPJ </label>
                            <input type="text" class="form-control" id="cnpj" name="cnpj" value="${cnpj}">`;
                        if(!cnpj){
                            html += `
                                <div class="alert alert-danger" role="alert">
                                    Por favor informe o CNPJ
                                </div>
                            `;
                        }
                        html +=`

                        <div class="col-md-6">
                            <label for="nome" class="form-label">Razao Social </label>
                            <input type="text" class="form-control" id="razao" name="razao" value="${razao}">`;
                        if(!razao){
                            html += `
                                <div class="alert alert-danger" role="alert">
                                    Por favor informe a razao social
                                </div>
                            `;
                        }
                        html +=`

                        <div class="col-md-6">
                            <label for="nome" class="form-label">Nome fantasia </label>
                            <input type="text" class="form-control" id="fantasia" name="fantasia" value="${fantasia}">`;
                        if(!fantasia){
                            html += `
                                <div class="alert alert-danger" role="alert">
                                    Por favor informe o nome fantasia
                                </div>
                            `;
                        }
                        html +=`

                        </div>

                        <div class="col-12">
                            <label for="endereço" class="form-label">Endereço</label>
                            <input type="text" class="form-control" id="endereco" name="endereco" placeholder="Rua Presidente Vargas, 123" value="${endereco}">`;
                        if(!endereco){
                            html += `
                                <div class="alert alert-danger" role="alert">
                                    Por favor informe o endereço
                                </div>
                            `;  
                        }
                        html +=` 

                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Cidade</label>
                            <input type="text" id="cidade" name="cidade" class="form-control" value="${cidade}">`;
                        if(!cidade){
                            html += `
                                <div class="alert alert-danger" role="alert">
                                    Por favor informe a cidade
                                </div>
                            `; 
                        } 
                        html +=`  

                        </div>

                        <div class="col-md-4">
                            <label for="estado" class="form-label">UF</label>
                            <select name="estado" class="form-select">
                                <option value="" selected>Selecione...</option>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AP">AP</option>
                                <option value="AM">AM</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PR">PR</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS">RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                                <option value="SE">SE</option>
                                <option value="TO">TO</option>
                            </select>`;
                        if(!estado){
                            html += `
                                <div class="alert alert-danger" role="alert">
                                    Por favor informe o estado
                                </div>
                            `;
                        }  
                        html +=`  

                        </div>

                        <div class="col-md-2">
                            <label for="CEP" class="form-label">CEP</label>
                            <input type="text" class="form-control" id="CEP" name="CEP" value="${CEP}">`;
                        if(!CEP){
                            html += `
                                <div class="alert alert-danger" role="alert">
                                    Por favor informe o CEP
                                </div>
                            `;  
                        }    
                        html +=`  
                    
                        </div>

                        <div class="col-md-6">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" value="${email}">`;
                        if(!email){
                            html += `
                                <div class="alert alert-danger" role="alert">
                                    Por favor informe o e-mail
                                </div>
                            `;
                        }
                        html +=`
                        </div>

                        <div class="col-md-6">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="text" class="form-control" id="telefone" name="telefone" value="${telefone}">`;
                        if(!telefone){
                            html += `
                                <div class="alert alert-danger" role="alert">
                                    Por favor informe o telefone
                                </div>
                            `;
                        }
                        html +=`
                        </div>




                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">
                                CADASTRAR
                            </button>
                            <a button type="submit" class="btn btn-primary" href="/">
                                VOLTAR
                            </button></a>
                        </div>

                    </form>

                </div>

            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </html>`;

        resposta.write(html);
        resposta.end();

    }

    else{

        listacadastro.push(
            {
                "cnpj": cnpj,
                "razao": razao,
                "fantasia":fantasia,
                "endereco": endereco,
                "cidade": cidade,
                "estado": estado,
                "CEP": CEP,
                "email": email,
                "telefone": telefone ,

            }
        );
    }
    resposta.redirect("/listacadastro");
});

app.get("/listacadastro", (requisicao, resposta) => {
    resposta.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Formulario de jogador</title>

                <link 
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" 
                    rel="stylesheet"
                >
            </head>

            <body>
                <div class="container mt-5">  
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">CNPJ</th>
                                <th scope="col">Razao Social</th>
                                <th scope="col">Nome Fantasia</th>
                                <th scope="col">Endereco</th>
                                <th scope="col">Cidade</th>
                                <th scope="col">Estado</th>
                                <th scope="col">CEP</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Telefone</th>
                                
                            </tr>
                        </thead> 
                        <tbody>   

    `);
    for(let i = 0 ; i < listacadastro.length; i++){
        const cadastro = listacadastro[i];
        resposta.write(`
            <tr>
                <td>${i+1}</td>
                <td>${cadastro.cnpj}</td>
                <td>${cadastro.razao}</td>
                <td>${cadastro.fantasia}</td>
                <td>${cadastro.endereco}</td>
                <td>${cadastro.cidade}</td>
                <td>${cadastro.estado}</td>
                <td>${cadastro.CEP}</td>
                <td>${cadastro.email}</td>
                <td>${cadastro.telefone}</td>
            
            </tr>        
        `)
    }
    resposta.write(`    </tbody>
                    </table>
                    <a button type="submit" class="btn btn-primary" href="/cadastro">
                        CONTINUAR
                    </button></a>
                
                    <a button type="submit" class="btn btn-primary" href="/">
                        VOLTAR
                    </button></a>
                        
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </html>
    `);
    resposta.end();
});

app.get("/login", (req, res) => {
    res.write(`
        
        <!doctype html>
        <html lang="pt-br">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="">
            <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
            <meta name="generator" content="Hugo 0.84.0">
            <title>Pagina login</title>

            <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sign-in/">

            

            <!-- Bootstrap core CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
                    
            <!-- Favicons -->
            <link rel="apple-touch-icon" href="/docs/5.0/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
            <link rel="icon" href="/docs/5.0/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
            <link rel="icon" href="/docs/5.0/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
            <link rel="manifest" href="/docs/5.0/assets/img/favicons/manifest.json">
            <link rel="mask-icon" href="/docs/5.0/assets/img/favicons/safari-pinned-tab.svg" color="#7952b3">
            <link rel="icon" href="/docs/5.0/assets/img/favicons/favicon.ico">
            <meta name="theme-color" content="#7952b3">

            <style>
            .bd-placeholder-img {
                font-size: 1.125rem;
                text-anchor: middle;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
            }

            @media (min-width: 768px) {
                .bd-placeholder-img-lg {
                font-size: 3.5rem;
                }
            }
            </style>

            
            <!-- Custom styles for this template -->
            <link href="signin.css" rel="stylesheet">
        </head>
            <body class="text-center">
            <div class="container w-50">
                
                <main class="form-signin">
                <form>
                    <img class="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
                    <h1 class="h3 mb-3 fw-normal">Por favor faça o login</h1>

                    <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email</label>
                    </div>
                    <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Senha">
                    <label for="floatingPassword">Senha</label>
                    </div>

                    <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> Lembrar
                    </label>
                    </div>
                    <a href="/" button class="w-100 btn btn-lg btn-primary" type="submit">Entrar</button></a>

                    
                </form>
                </main>
            </div>    

            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>  
            </body>
        </html>

        
    `)
    res.end();
});


app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
