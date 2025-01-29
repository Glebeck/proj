import {defineStore} from 'pinia';
import axios from 'axios';
import { error } from 'console';


export const useBookStore=defineStore('book',{
  state:()=>({
    books:[],
    cart:[],
    loading:false,
    error:null,
  }),
  actions:{
    async fetchBooks(){
      
      this.loading=true;
      this.error=null;
      try{
        const response=await axios.get('http://localhost:5001/api/books')
        this.books=response.data;

      }catch(error){
        this.error='Ошибка при загрузке книг';
        console.error('Ошибка при загрузке книг:',error)
      }  finally{
        this.loading=false;
      }
    },
    async addBook(newBook){
      try{
        const response = await axios.post('http://localhost:5001/api/books');
        this.books.push(response.data);
      } catch(error){
        console.error('Ошибка при добавлении книги:',error)
      }
    },
    addToCart(book){
      this.cart.push(book);
    },
  }
});