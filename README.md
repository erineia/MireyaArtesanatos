Mireya Artesanatos

Este projeto é um site de vendas de artesanatos, onde clientes podem navegar pelos produtos, adicionar itens ao carrinho e finalizar o pedido pelo WhatsApp.
available: true, // true = disponível | false = indisponível
madeToOrder: false, // true = sob encomenda | false = pronta entrega
variations: [] // Array de variações: ["Azul", "Rosa", "Verde"]

Passo 3: Exemplo prático de adição
const products = [
// Produtos existentes...

// ADICIONE SEU NOVO PRODUTO AQUI:
{
id: 11, // Sempre use um ID novo!
name: "Cesta de Crochê",
price: 65.00,
category: "Decoração",
description: "Linda cesta feita em crochê com linha 100% algodão. Perfeita para organizar objetos pequenos, ideal para banheiro ou quarto.",
images: [
"https://i.imgur.com/exemplo1.jpg"
],
available: true,
madeToOrder: true,
variations: ["Pequena", "Média", "Grande"]
},
// Não esqueça da vírgula entre produtos!
];

📸 Como Adicionar Imagens
Opção 1: ImgBB (Recomendado - Grátis)
Acesse: https://imgbb.com/
Clique em "Start uploading"
Faça upload da foto
Copie o link "Direct link"
Cole no campo images
Opção 2: Imgur
Acesse: https://imgur.com/
Clique em "New post"
Faça upload da foto
Clique com botão direito na imagem
Selecione "Copiar endereço da imagem"
Cole no campo images
Opção 3: Google Drive
Faça upload no Google Drive
Clique com botão direito → "Compartilhar"
Mude para "Qualquer pessoa com o link"
Use ferramentas online para converter o link em direto
⚠️ IMPORTANTE:

Use links que terminem em .jpg, .png ou .webp
Teste o link no navegador antes de adicionar
Imagens muito pesadas podem deixar o site lento (ideal: menos de 500KB)
🎨 Categorias Disponíveis
Use EXATAMENTE um destes nomes (copie e cole):

"Decoração"
"Presentes"
"Personalizados"
🔢 Sobre os IDs
Cada produto precisa de um ID único
Comece do 1 e vá aumentando: 1, 2, 3, 4...
NUNCA repita um ID!
Se remover um produto, não precisa reorganizar os IDs
✏️ Variações de Produtos
Produto SEM variações:
variations: []

Produto COM variações:
variations: ["Cor Azul", "Cor Rosa", "Cor Verde", "Cor Amarela"]

Ou variações de tamanho:

variations: ["Pequeno (10cm)", "Médio (20cm)", "Grande (30cm)"]

💰 Preços
Use ponto para separar centavos: 45.50
Não use vírgula: ~~45,50~~
Não use cifrão no código: ~~R$ 45.50~~
Exemplos corretos:
price: 35.00
price: 120.50
price: 15.99
📱 Configurar Número do WhatsApp
Procure no código por:

// Número do WhatsApp (formato: código do país + DDD + número, sem espaços ou caracteres especiais)
const WHATSAPP_NUMBER = "5511999999999"; // ALTERE AQUI

Formato correto:

Brasil: 55 (código do país)
DDD: 11 (São Paulo), 21 (Rio), etc.
Número: 999999999 (9 dígitos com o 9 na frente)
Exemplo completo: "5511987654321"

✅ Checklist Antes de Publicar
Ao adicionar um produto novo, verifique:

[ ] ID é único e não repete
[ ] Nome está claro e descritivo
[ ] Preço está com ponto (não vírgula)
[ ] Categoria está escrita corretamente
[ ] Descrição é completa e atrativa
[ ] Link da imagem funciona (teste no navegador)
[ ] available está correto (true/false)
[ ] madeToOrder está correto (true/false)
[ ] Vírgula no final do produto (antes do próximo)
[ ] Testou o site após adicionar
🐛 Problemas Comuns
Produto não aparece no site
✅ Verificou se tem vírgula entre os produtos?
✅ O ID é único?
✅ A categoria está escrita corretamente?
✅ Salvou o arquivo depois de editar?
Imagem não carrega
✅ O link funciona quando você cola no navegador?
✅ O link termina em .jpg, .png ou .webp?
✅ O link está entre aspas?
Site ficou em branco
✅ Provavelmente faltou uma vírgula ou tem um erro de digitação
✅ Verifique se todas as chaves { } estão fechadas
✅ Verifique se todos os colchetes [ ] estão fechados
📋 Template para Copiar e Colar
{
id: 0, // MUDE O NÚMERO!
name: "",
price: 0.00,
category: "Decoração",
description: "",
images: [
""
],
available: true,
madeToOrder: false,
variations: []
},

🎓 Exemplo Completo
const products = [
{
id: 1,
name: "Vasinho com Garrafa Pet",
price: 35.00,
category: "Decoração",
description: "Vaso decorativo criado a partir de garrafa pet reciclada, pintado à mão. Sustentável e charmoso!",
images: [
"https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=600&fit=crop"
],
available: true,
madeToOrder: false,
variations: []
},
{
id: 2,
name: "Cesta de Crochê Personalizada",
price: 65.00,
category: "Personalizados",
description: "Cesta artesanal em crochê, feita sob encomenda nas cores que você escolher. Material: linha 100% algodão.",
images: [
"https://exemplo.com/cesta1.jpg",
"https://exemplo.com/cesta2.jpg"
],
available: true,
madeToOrder: true,
variations: ["Rosa Bebê", "Azul Claro", "Amarelo Pastel", "Branco"]
}
];

💡 Dicas de Boas Práticas
Tire boas fotos: Fundo limpo, boa iluminação, mostra detalhes
Descrições vendedoras: Fale dos materiais, tamanho, uso
Preços justos: Considere material + tempo + valor do trabalho manual
Mantenha atualizado: Remova produtos esgotados (mude available: false)
Categorize bem: Ajuda o cliente a encontrar o que procura
