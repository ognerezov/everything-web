import {Book} from "../model/Book";
import {BookAction, BookOperation} from "../actions/book";

export default function (book : Book ={},action : BookAction): Book {
        let newBook = {...book};

    function fillBook() {
        for (let i = 0; i < action.chapters.length; i++) {
            newBook[action.chapters[i].number] = action.chapters[i];
        }
        return newBook;
    }

    switch (action.type) {
            default:
                return book;
            case BookOperation.Get:
            case BookOperation.Found:
                return fillBook();
        }
}
