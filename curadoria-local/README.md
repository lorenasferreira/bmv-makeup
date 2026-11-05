# Curadoria local BMV

Na raiz do projeto, execute:

```sh
python3 curadoria-local/servidor.py
```

Abra **http://127.0.0.1:8765** no Safari do Mac (17+ para HEIC). Para encerrar, Ctrl+C no terminal. Não é necessário iniciar o frontend. O servidor escuta apenas no próprio computador, oferece somente leituras e não tem rotas de edição/upload. A pasta está fora de `frontend/public` e não é importada pelo aplicativo.

As miniaturas usam os originais por HTTP e CSS, sem cópias, conversão ou compressão. O navegador pode carregar arquivos grandes. O servidor envia o MIME real, inclusive CAS-12, cujo nome termina em PNG mas contém JPEG.

1. Filtre por categoria/orientação ou busque o ID/nome.
2. Marque até quatro fotos para comparar e, opcionalmente, simule recortes. “Original completo” preserva o enquadramento na tela.
3. Anote observações nos cartões. Use **Exportar anotações** para salvar JSON; o armazenamento do navegador é apenas uma conveniência, não o registro definitivo.
4. Abra `escolhas.csv` no Numbers, Excel ou editor. Cada linha é um espaço identificado; preencha `escolha_desktop`, `escolha_mobile`, `ponto_focal`, `aprovacao` e `notas`. Exemplo: `BRU-08`, ponto focal `50% 35%`, aprovação `aprovada por Lorena`. Para Portfolio, selecione somente a categoria correspondente e registre a proporção original desejada.
5. Salve a planilha nesta pasta, preservando os IDs dos espaços. Nada será implementado automaticamente. Compartilhe as escolhas quando estiverem prontas.

`MAPEAMENTO.md` descreve cada posição, fontes/CSS inspecionados, estado atual, lacunas e sugestões geométricas. `inventario.json`/`.csv` incluem caminhos originais, dimensões, MIME, formato real, bytes e SHA-256. `espacos.json` é o retrato inicial do mapeamento. **Não execute preparar.py depois de preencher escolhas.csv**, pois ele recria a planilha inicial.

Nenhum original nem arquivo do site foi alterado. Não houve commit, push ou deploy. Mantenha esta ferramenta local fora de qualquer publicação.

## Inclusão Lorena — Beauty & Social (5 novembro 2026)

44 novas fotos, IDs **LBS-01 a LBS-44**; 19 verticais e 25 horizontais, 42 JPEG e 2 HEIC. Catálogo total: 109 fotos. No filtro Categoria, selecione **Lorena — Beauty & Social** e, para procurar as candidatas, selecione orientação **vertical**. Para comparar com Bruno, marque fotos do grupo Lorena e depois mude o filtro para uma categoria do Bruno: a comparação permanece acima dos grupos.

**Exportar seleção CSV** salva as fotos marcadas, seus IDs, grupo, proporção, simulação de recorte e anotações. A aprovação sai como pendente; essa exportação é uma lista de candidatas e não substitui `escolhas.csv`. Para decisões por espaço (Portfolio/Services), continue preenchendo os IDs nessa planilha existente, sem alterar decisões já registradas. **Exportar anotações** inclui também os metadados dos novos IDs, preservando notas antigas.

Continue usando o mesmo navegador e **http://127.0.0.1:8765** para acessar as anotações locais existentes. Não houve migração nem limpeza de localStorage. As notas privadas já salvas no navegador não foram lidas por esta importação.

A importação usou SHA-256 para evitar cópias binárias. `profile.JPG` repete LBS-04; `ff4b5fa5-eecb-42f5-ac28-82f10e330d5a.JPG` repete LBS-44. Nenhum arquivo original foi alterado. `importacao-lorena.json` registra todos os arquivos verificados e os duplicados omitidos. Imagens semelhantes com bytes diferentes permanecem para comparação artística.

Para repetir a inclusão sem recriar decisões: `python3 curadoria-local/adicionar-lorena.py`. Esse importador é incremental. Não use `preparar.py` para atualizar o catálogo, pois é o gerador inicial e recria arquivos de escolhas.

## Redistribuição em Beauty e Social (5 novembro 2026)

A classificação atual substitui o grupo temporário Lorena — Beauty & Social e separa o antigo grupo combinado Social and Beauty do Bruno. Os nomes de filtro passam a ser **Beauty** e **Social**, compartilhados pelos IDs LBS e SOC. As pastas originais e os IDs não mudam; `categoria_original` mantém a procedência, e `importacao-lorena.json` permanece como registro histórico da inclusão.

Das 44 LBS, **28 estão em Beauty e 16 em Social**. Incluindo as 11 SOC do Bruno, há **36 Beauty e 19 Social**, dentro das mesmas **109 fotos** totais. A classificação usa o conteúdo: Beauty destaca técnica/acabamento da maquiagem; Social destaca retrato pessoal e visual completo/contexto. Não se presume um evento específico nem aprovação para implementação. As justificativas individuais estão em `classificacao-beauty-social.json`.

Filtros, comparação e exportações leem a categoria atual do inventário. Atualize http://127.0.0.1:8765 no mesmo navegador para manter acesso às anotações já salvas. `escolhas.csv`, registros da About e notas não foram reescritos. Não execute preparar.py para atualizar decisões. O importador incremental não recria o grupo temporário; novas imagens ainda não classificadas exigem revisão visual antes da inclusão.


## Correção definitiva de categoria

**Beauty and Social é uma única categoria.** Todas as 44 LBS e as 11 SOC do Bruno estão reunidas nesse filtro (55 fotos). As subdivisões Beauty/Social descritas acima foram revogadas; o histórico foi mantido. O catálogo continua com 109 fotos, sem mudança de IDs, escolhas ou anotações.
