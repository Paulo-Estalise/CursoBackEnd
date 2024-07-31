const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.nextId = 1;
        this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.nextId = Math.max(...this.products.map(p => p.id)) + 1;
            }
        }
    }

    saveProducts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos os campos são obrigatórios");
            return;
        }
        if (this.products.some(p => p.code === code)) {
            console.error(`Código ${code} já existe`);
            return;
        }
        const newProduct = {
            id: this.nextId,
            ...product
        };
        this.products.push(newProduct);
        this.nextId += 1;
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error("Não encontrado");
            return null;
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error("Produto não encontrado");
            return;
        }
        this.products[index] = { ...this.products[index], ...updatedFields };
        this.saveProducts();
    }
}


const filePath = path.join(__dirname, 'products.json');
const manager = new ProductManager(filePath);

manager.addProduct({
    title: "Produto 1",
    description: "Descrição do Produto 1",
    price: 10.99,
    thumbnail: "/caminho/para/imagem1.jpg",
    code: "codigo1",
    stock: 100
});

manager.addProduct({
    title: "Produto 2",
    description: "Descrição do Produto 2",
    price: 15.99,
    thumbnail: "/caminho/para/imagem2.jpg",
    code: "codigo2",
    stock: 50
});

console.log(manager.getProductById(1));
console.log(manager.getProducts());

manager.updateProduct(1, { price: 12.99, stock: 80 });
console.log(manager.getProductById(1));
