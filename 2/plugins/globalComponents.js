import Vue from 'vue'
import Post from '../components/global/cards/Post'
import PostDetails from '../components/global/PostDetails'
import Product from '../components/global/cards/Product/'
import Cart from '../components/global/cart/Item'
import UpsellCart from '../components/global/cart/UpsellCart'
import Input from '../components/global/inputs/Input'
import Quantity from '../components/global/inputs/Quantity'
import Select from '../components/global/inputs/Select'
import Button from '../components/global/Button'
import Image from '../components/global/Images'
import Block from '../components/global/Block'
import SlickImage from '../components/global/SlickImage'
import Slick from '../components/global/Slick'
import SideBarShop from '../components/global/sidebar-content/shop/SideBar'
import SideBarBlog from '../components/global/sidebar-content/blog/SideBar'
import CheckList from '../components/global/CheckList'
import RangPrice from '../components/global/sidebar-content/shop/Rang-price'
import Color from '../components/global/sidebar-content/shop/Colors'
import Size from '../components/global/sidebar-content/shop/Size'
import HeaderTop from '../components/global/header/Header_top'
import Menu from '../components/global/menu/Menu'
import Logo from '../components/global/Logo'
import SocialMedia from '../components/global/socialMedia/SocialMedia'
import ButtonShare from '../components/global/socialMedia/ButtonShare'
import Upsell from '../components/global/upsell/Upsell'
import ProductVariant from '../components/global/productVariant'
import Description from '../components/global/productDescription/Description'
import Reviews from '../components/global/productDescription/Reviews'
import Pagination from '../components/global/Pagination'
import ProductGrid from '../components/global/ProductGrid'
import Brands from '../components/global/Brands'
import Loader from '../components/global/Loader'
import LoaderCart from '../components/global/LoaderCart'
import LoaderProductDetails from '../components/global/LoaderProductDetails'
import LoaderGlobal from '../components/global/LoaderGlobal'
import AddToCartAnimation from '../components/global/AddToCartAnimation'
import RelatedProducts from '../components/global/RelatedProducts'
import CartEmpty from '../components/global/CartEmpty'
import WishlistEmpty from '../components/global/WishlistEmpty'
import Error from '../components/global/Error'
import Thank from '../components/global/Thank'
import AppLoader from '@/components/global/AppLoader.vue'
import PopupConfirm from '@/components/global/PopupConfirm.vue'

Vue.component('app-loader', AppLoader)
Vue.component('si-post', Post)
Vue.component('si-postDetails', PostDetails)
Vue.component('si-product', Product)
Vue.component('si-cart', Cart)
Vue.component('si-upsellCart', UpsellCart)
Vue.component('si-input', Input)
Vue.component('si-quantity', Quantity)
Vue.component('si-select', Select)
Vue.component('si-button', Button)
Vue.component('si-image', Image)
Vue.component('si-block', Block)
Vue.component('si-sideBarShop', SideBarShop)
Vue.component('si-sideBarBlog', SideBarBlog)
Vue.component('si-chekList', CheckList)
Vue.component('si-rangePrice', RangPrice)
Vue.component('si-color', Color)
Vue.component('si-size', Size)
Vue.component('si-slickImage', SlickImage)
Vue.component('si-slick', Slick)
Vue.component('si-menu', Menu)
Vue.component('si-headerTop', HeaderTop)
Vue.component('si-socialMedia', SocialMedia)
Vue.component('si-buttonShare', ButtonShare)
Vue.component('si-logo', Logo)
Vue.component('si-upsell', Upsell)
Vue.component('si-productVariant', ProductVariant)
Vue.component('si-description', Description)
Vue.component('si-reviews', Reviews)
Vue.component('si-pagination', Pagination)
Vue.component('si-productGrid', ProductGrid)
Vue.component('si-brands', Brands)
Vue.component('si-loader', Loader)
Vue.component('si-loaderCart', LoaderCart)
Vue.component('si-loaderProductDetails', LoaderProductDetails)
Vue.component('si-loaderGlobal', LoaderGlobal)
Vue.component('si-cartEmpty', CartEmpty)
Vue.component('si-wishlistEmpty', WishlistEmpty)
Vue.component('si-error', Error)
Vue.component('si-thank', Thank)
Vue.component('si-popupConfirm', PopupConfirm)

Vue.component('si-addToCartAnimation', AddToCartAnimation)
Vue.component('si-relatedProducts', RelatedProducts)

//---------- sections

import Header from '../sections/Header'
import Footer from '../sections/Footer'
import Slider from '../sections/slider'
import CollectionsCarousel from '../sections/CollectionsCarousel'
import FeaturedProducts from '../sections/FeaturedProducts'
import ProductDetailsSections from '../sections/ProductDetailsSections'
import Upsells from '../sections/Upsells'
import HomeBlog from '../sections/HomeBlog'
import ShoppingCart from '../sections/ShoppingCart'
import Posts from '../sections/Posts'
Vue.component('si-header', Header)
Vue.component('si-footer', Footer)
Vue.component('si-slider', Slider)
Vue.component('si-collections_carousel', CollectionsCarousel)
Vue.component('si-featured_products', FeaturedProducts)
Vue.component('si-home_blog', HomeBlog)
Vue.component('si-productDetailsSections', ProductDetailsSections)
Vue.component('si-upsells', Upsells)
Vue.component('si-shoppingCart', ShoppingCart)
Vue.component('si-posts', Posts)


