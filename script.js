const alternarEntreDarkELight = document.querySelector('.cabecalho__switch');
const containerVideos = document.querySelector('.videos__container'); 
const btnAlternarTema = document.querySelector('.cabecalho__switch-input');

btnAlternarTema.addEventListener('click', () => {
    document.body.classList.toggle('tema__dark');
    document.querySelector('nav').classList.toggle('tema__dark');
    document.querySelector('.superior__secao__container').classList.toggle('tema__dark');
    document.querySelector('.cabecalho__pesquisar__item').classList.toggle('tema__dark');
    document.querySelector('aside').classList.toggle('tema__dark');
});

async function buscarEMostrarVideo() {
    try {
    const busca = await fetch('http://localhost:3000/videos');
    const videos = await busca.json();

        videos.forEach((video) => {
            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `
        });
    } catch (error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos. [Error]${error}`
    };
};

buscarEMostrarVideo();

const barraDePesquisa = document.querySelector('.pesquisar__input');
barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');

    if (barraDePesquisa.value != '') {
        for(let video of videos) { // loop entre os videos adicionados
            let titulo = video.querySelector('.titulo-video').textContent.toLowerCase(); // consulta o titulo dos videos 
            let valorFiltro = barraDePesquisa.value.toLowerCase(); // traz o valor que foi digitado na barra de pesquisa 

            if (!titulo.includes(valorFiltro)) { // se titulo for diferente do que foi digitado 
                video.style.display = 'none'; 
            } else {
                video.style.display = 'block';
            };
        };
        
    } else {
        video.style.display = 'block';
    };
};

const botaoCategoria = document.querySelectorAll('.superior__item');

botaoCategoria.forEach((botao) => {
    let nomeDaCategoria = botao.getAttribute('name');
    botao.addEventListener('click', () => filtrarPorCategoria(nomeDaCategoria));
});

function filtrarPorCategoria(filtro) {
    const videos = document.querySelectorAll('.videos__item');
    for(let video of videos) {
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = 'none'; 
        } else {
            video.style.display = 'block'; 
        };
    };
};


