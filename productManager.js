class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos os campos são obrigatórios");
            return;
        }
        if (this.products.some(product => product.code === code)) {
            console.error(`Código ${code} já existe`);
            return;
        }
        const product = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        this.nextId += 1;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error("Não encontrado");
            return null;
        }
        return product;
    }
}

const manager = new ProductManager();
manager.addProduct("Produto 1", "Descrição do Produto 1", 10.99, "/caminho/para/imagem1.jpg", "codigo1", 100);
manager.addProduct("Produto 2", "Descrição do Produto 2", 15.99, "/caminho/para/imagem2.jpg", "codigo2", 50);

console.log(manager.getProductById(1));
console.log(manager.getProductById(3));
