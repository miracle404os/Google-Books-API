import BookLoader from "../api/api";
import { bookListRender, getCategory } from "../utils";
import Cart from "../models/cart";
import Sidebar from "./sidebar";

const bookIds: Array<string> = JSON.parse(
  window.localStorage.getItem("cart") ?? "[]"
);

const cart = new Cart(bookIds);

const bookList: HTMLElement = <HTMLElement>document.getElementById("bookList");

const sidebar: HTMLElement = <HTMLElement>document.getElementById("sidebar");

const initialCategory = getCategory(sidebar);

const loader = new BookLoader(initialCategory, 0, 6);

const loadMoreBtn: HTMLButtonElement = <HTMLButtonElement>(
  document.getElementById("loadMoreBtn")
);

loadMoreBtn.addEventListener("click", () => {
  const startIndex: number = parseInt(
    loadMoreBtn.dataset.startIndex ? loadMoreBtn.dataset.startIndex : "0"
  );

  loader.setParams(getCategory(sidebar), startIndex, 6);
  loader.getBooks().then((data) => {
    bookListRender(data, bookList, cart);
    loadMoreBtn.dataset.startIndex = (startIndex + 6).toString();
  });
});

loader.getBooks().then((data) => {
  bookListRender(data, bookList, cart);
  loadMoreBtn.dataset.startIndex = "6";
});

const sidebarMenu = new Sidebar(loader, bookList, cart);
sidebarMenu.render();
