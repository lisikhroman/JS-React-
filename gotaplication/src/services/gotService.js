export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await  res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses/');
        return this._transformHouses(res)
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouses(house);
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books/');
        return this._transformHouses(res);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBooks(book);
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformHouses(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBooks(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}