import React,{PureComponent} from "react";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import ChapterViewer from "./ChapterViewer";
import {getChapters} from "../../thunks/getChapter";
import {Book, Chapter, getMeta} from "../../model/Book";
import {User} from "../../model/User";
import {getCurrentChapters} from "../../thunks/getChapter";
import {getData} from "../../thunks/getData";
import DocumentMeta from 'react-document-meta';

interface LayersViewerProps {
    book : Book;
    layers: number[];
    getChapters : any;
    defaultMeta ?: boolean
    user : User;
    inStack : boolean;
    selected ?:number;
    getData : any;
    getCurrentChapters : any
}

const DEFAULT_META = {
    title: 'Everything from one',
    description: 'Современная цифровая философия',
    meta: {
        charset: 'utf-8',
        name: {
            keywords: [
                'философия','нумерология','числа','как работает Вселенная','психология','управление', 'эзотерика',
            ]
        }
    }
}

class LayersViewer extends PureComponent<LayersViewerProps>{
    render() {
        const top = this.props.layers[this.props.layers.length - 1];
        const chapter : Chapter = this.props.book[this.props.selected === undefined ? top : this.props.layers[this.props.selected]]

        if(!chapter){
            return null
        }

        return (
            <DocumentMeta {...this.props.defaultMeta ? DEFAULT_META : getMeta(chapter)}>
                <ChapterViewer chapter={chapter} closable={this.props.inStack}/>
            </DocumentMeta>
         )
    }
}

const mapStateToProps = (state : AppState)=>{
    const inStack = state.settings.layers.length > 1;
    return {book : state.book, layers: state.settings.layers, user : state.user, inStack, selected : state.settings.selected}};

export default connect(mapStateToProps,{getChapters, getData, getCurrentChapters})(LayersViewer);
