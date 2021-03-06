import styled from 'styled-components';
import imgurl from  '../../statics/images/jl.png'
import tuichu from  '../../statics/images/reset-tuichu.png'
import beifen from  '../../statics/images/reset-beifen.png'
import jia from  '../../statics/images/reset-jia.png'
import sousuo from  '../../statics/images/reset-sousuo.png'
import bianji from  '../../statics/images/reset-bianji.png'
import shanchu from  '../../statics/images/reset-shanchu.png'
import yijiao from  '../../statics/images/reset-yijiao.png'
import daochu from  '../../statics/images/reset-daochu.png'
import select from  '../../statics/images/reset-select.png'
import fbj from  '../../statics/images/reset-fangbj.png'

// const h5 = '500px'
// const h4 = '400px'
const h3 = '300px'

export const ConWrapper = styled.div`
    display:flex;
    flex-flow:row;
    height:100%;
`;

export const LeftWrapper = styled.div`
    width:200px;
    height:100%;
    float:left;
    position:relative;
    border-right:1px solid #f7f7f7;
    box-sizing: content-box;
`;

// left
export const LeftTop = styled.div`
    width:100%;
    height:60px;
    background:#55a12f;
    text-align:center;
    color:#fff;
    p{  
        font-size:16px;
        height:30px;
        letter-spacing:2px;
        margin:0;
    }
    p:first-child{
        line-height:35px;
    }
    p:nth-child(2){
        line-height:25px;
    }
`;

export const LeftCustomer = styled.div`
    img{
        display:block;
        width:60px;
        height:60px;
        margin:0 auto;
    }
    .moren-img{
        display:block;
        width:60px;
        height:60px;
        margin:0 auto;
        background:url(${imgurl}) 100% 100% no-repeat;
        background-size:cover;
        margin:30px auto 10px;
    }
    span{
        display:block;
        width:60px;
        height:60px;
        margin:0 auto;
        font-size:60px;
        color:#DDD;
        margin:30px auto 10px;
        line-height: 60px;
    }
    p{
        font-size:14px;
        color:#999999;
        text-align:center;
    }
`;

export const LeftItemUl = styled.ul`
    width:160px;
    margin:45px auto 0;
`;

export const LeftItemLi = styled.li`
    width:100%;
    overflow:hidden;
    height:40px;
    margin-bottom:10px;
    cursor:pointer;
    span{
        display:inline-block;
        color:#333;
        font-size:14px;
        float:left;
        line-height:40px;
        position:relative;
        i{
            display:block;
            position:absolute;
            top:5px;
            right:-15px;
            width:10px;
            height:10px;
            background:#f99377;
            border-radius:50%;
        }
    }
    img{
        display:inline-block;
        width:18px;
        margin:10px 10px 0 35px;
        float:left;
    }
    &:hover{
        background:#fafafa;
    }
    a{
        display:block;
        height:100%;
    }
    &.nowork{
        display:none;
    }
    &>a.handleActice{
        background:#f7f7f7;
    }
`;

export const LeftButton = styled.div`
    width:100%;
    position:absolute;
    bottom:0;
    left:0;
    display:flex;
    div{
        flex:1;
        cursor:pointer;
    }
    div span{
        font-size:14px;
        line-height:50px;
        text-align:center;
        float: left;
    }
    div:nth-child(1) span:nth-child(1){
        margin:0 5px 0 20px;
    }
    div:nth-child(2) span:nth-child(1){
        margin:0 5px 0 0px;
    }
    a{
        display:block;
        color:#666;
    }
    a:hover{
        color:#666;
    }
    .reset-tuichu{
        display:inline-block;
        width: 18px;
        height: 18px;
        border-radius:50%;
        overflow:hidden;
        background:url(${tuichu}) 100% 100% no-repeat;
        background-size:cover;
        margin: 15px 5px 0 20px;
        float: left;
    }
    .reset-beifen{
        display:inline-block;
        width: 18px;
        height: 18px;
        border-radius:50%;
        overflow:hidden;
        background:url(${beifen}) 100% 100% no-repeat;
        background-size:cover;
        margin: 15px 5px 0 10px;
        float: left;
    }
`;

// 客户管理和详情整个部分
export const RightCon = styled.div`
    height:100%;
    flex:1;
    float:left;
    display:flex;
`;

export const Customer = styled.div`
    width:450px;
    position:relative;
    .belongs-cus{
        height:40px;
        line-height:40px;
        padding-left:20px;
    }
`;

export const DetailWrapper = styled.div`
    flex:2;
    background:#fff;
    overflow-y:auto;
    overflow-x:hidden;
    position:relative;
    &::-webkit-scrollbar-track-piece { 
        background-color:#f7f7f7;
    }
    &::-webkit-scrollbar{
        width: 8px;
    }
    &::-webkit-scrollbar-thumb
    {
        background-color:#dbdbdb;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
    & .iconfont{
        font-size:20px;
        cursor:pointer;
        margin-top:20px;
    }
    & .transferIcon{
        margin-left:20px;
    }
    .ant-empty{
        margin-top:30%;
    }
`;

export const MiddleHeader = styled.div`
    height:60px;
    background:#f7f7f7;
    >span{
        display:block;
        float:left;
        line-height:60px;
        padding-left:30px;
        font-size:16px;
        color:#333;
    }
    .searchTotal{
        font-size:13px;
        color:#666;
    }
`;

// 搜索部分
export const SearchWrapper = styled.div`
    position: absolute;
    top: 60px;
    height:0;
    z-index: 1;
    box-shadow: 0px 10px 5px -3px #eee;
    overflow:hidden;
    background:#f7f7f7;
    input{
        outline:none;
        border:1px solid #dcdcdc;
        border-radius:5px;
        padding:0 10px;
        margin-top: 5px;
    }
    input::placeholder{
        font-size:13px;
        color:#999;
    }
    margin-bottom:20px;
    transition:all ease-in .2s;
    &.searchWrapper{
        height:${h3};
    }
`;

export const SearchInput = styled.input`
    display:block;
    width:100%;
    height:30px;
    float:left;
    margin-top:2px;
    &:focus{
        border:1px solid #55a12f;
    }
    &::placeholder{
        font-size:12px;
        color:#999;
    }
`;

export const SearchCondition = styled.div`
    display:flex;
    margin:0px auto;
    overflow:hidden;
    span{
        display:block;
        float:left;
        font-size:13px;
        color:#666;
        line-height:30px;
        margin-top:20px;
        margin-right:10px;
    }
    .condition-select{
        padding:5px 5px;
        >p{
            margin-bottom:3px;
            font-size:14px;
        }
    }
    .condition-select-opacity{
        opacity:0;
    }

    // 公共客户样式
    &.public-condition{
        .condition-select{
            margin-top: 0px;
        }
        .condition-select{
            flex:1;
        }
        .ant-input{
            height:30px;
        }
        
    }
`;

export const AddButtonWrapper = styled.div`
    display:flex;
    justify-content:flex-end;
`;

export const AddCusButton = styled.div`
    width:70px;
    height:30px;
    border-radius:2px;
    font-size:14px;
    text-align:center;
    line-height:30px;
    margin:15px 0;
    cursor:pointer;
    &.add-save{
        background:#55a12f;
        color:#FFF;
        margin-right:30px;
    }
    &.add-cancel{
        color:#666;
    }
`;

export const SearchItem = styled.div`
    width:160px;
    float:left;
    margin:0 0 10px 0;
    p{
        font-size:14px;
        color:#333;
    }
    &:nth-child(odd){
        float:left;
        margin-right:20px;
    }
`;

export const SearchSelectItem = styled.input`
    &{
        outline:none;
        border:1px solid #dcdcdc;
        border-radius:5px;
        padding:0 10px;
        height:30px;
        background:#fff;
    }
    &:focus{
        border:1px solid #55a12f;
    }
    &::placeholder{
        font-size:12px;
        color:#999;
    }
`;

export const SearchSelect = styled.div`
    height:30px;
    background:#fff;
    position:relative;
    & .iconfont{
        position:absolute;
        right:0px;
        top:2px;
    }
`;

export const OperateWrapper = styled.div`
    display:flex;
    justify-content: flex-end;
    padding-right:30px;
    span{
        line-height:30px;
        padding:0 10px;
        padding-top:15px;
        font-size:20px;
        cursor:default;
        color:#999;
    }
    span:hover{
        color:#333;
    }
    .iconfont-add{
        font-size: 16px;
    }
    .reset-sousuo{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${sousuo}) 100% 100% no-repeat;
        background-size: cover;
        margin: 20px 5px 0 5px;
        float: left;
    }
    .reset-bianji{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${bianji}) 100% 100% no-repeat;
        background-size: cover;
        margin: 20px 10px 0 10px;
        float: left;
    }
    .reset-jia{
        display: inline-block;
        width: 19px;
        height: 19px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${jia}) 100% 100% no-repeat;
        background-size: cover;
        margin: 20px 10px 0 5px;
        float: left;
    }
    .reset-shanchu{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${shanchu}) 100% 100% no-repeat;
        background-size: cover;
        margin: 20px 5px 0 5px;
        float: left;
    }
    .reset-daochu{
        display: inline-block;
        width: 19px;
        height: 19px;
        overflow: hidden;
        background:url(${daochu}) 100% 100% no-repeat;
        background-size: cover;
        margin: 20px 10px 0 5px;
        float: left;
    }
`;

export const MiddleListWrapper = styled.div`
    overflow-y:auto;
    background:#f7f7f7;
    &.editSrollBar{
        position: relative;
        .ant-drawer-content-wrapper{
            height:auto!important;
        }
        .ant-drawer-content-wrapper, .ant-drawer-mask{
            position:absolute;
        }
        .ant-drawer-body{
            padding:0;
        }
    }
    &.editSrollBar-hidden{
        overflow-y:hidden;
    }
    &::-webkit-scrollbar-track-piece { 
        background-color:#f7f7f7;
    }
    &.editSrollBar::-webkit-scrollbar{
        width: 8px;
    }
    &.editSrollBar::-webkit-scrollbar-thumb
    {
        background-color:#f6f6f6;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
    &.middleListWrapper-active{
        padding-bottom:76px;
    }
    .ant-empty{
        margin-top: 30%;
    }
    .reset-select{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${select}) 100% 100% no-repeat;
        background-size: cover;
        margin: 20px 5px 0 5px;
        float: left;
    }

    &.stickSroll{
        height:85%;
        // overflow: hidden;
    }
    &.publicSroll{
        height:90%;
        position: relative;
        // overflow: hidden;
        .ant-drawer-content-wrapper{
            height:auto!important;
        }
        .ant-drawer-content-wrapper, .ant-drawer-mask{
            position:absolute;
        }
        .ant-drawer-body{
            padding:0;
        }
    }

    .scroll-box{
        height:100%;
    }
`;

// 新建客户部分
export const AddCustomerWrapper = styled.div`
    height:0px;
    overflow:hidden;
    background:#fff;
    color:#999;
    font-size:14px;
    text-align:center;
    line-height:80px;
    cursor:default;
    transition:all ease-in .2s;
    &.addcustomer-show{
        height:80px;
    }
`;

export const MiddleList = styled.div`
    clear:both;
    height:80px;
    border-left:4px solid #f7f7f7;
    cursor:default;
    box-sizing: content-box;
    img{
        display:block;
        width:40px;
        height:40px;
        border-radius:50%;
        float:left;
        margin:20px 15px 20px 25px;
    }
    .moren-img{
        display:block;
        width:40px;
        height:40px;
        border-radius:50%;
        float:left;
        margin:20px 15px 20px 25px;
        overflow:hidden;
        background:url(${imgurl}) 100% 100% no-repeat;
        background-size:cover;
    }
    border-bottom:1px solid #f3f3f3;
    
    &.selected{
        background:#fff;
        border-left:4px solid #55a12f;
        box-sizing: content-box;
    }
    >.iconfont{
        display:block;
        font-size:40px;
        color:#DDD;
        float:left;
        margin:12px 15px 20px 25px;
    }
    .same-active{
        margin: 30px -5px 0 15px!important;
        transition:all ease-in .15s;
        float: left;
    }
    .same-active1{
        width: 0px;
        opacity:0;
    }
    .same-active2{
        display: block;
        width: 0px;
        height: 20px;
        font-size: 20px;
        margin: 30px -15px 0 15px!important;
        color:#55a12f;
        opacity:0;
    }
    .click-active{
        width: 20px!important;
        opacity:1!important;
        height: 20px!important;
    }
    .same-active3 + .same-active1{
        width: 0px!important;
        opacity:0!important;
    }
    .stiick{
        float:right;
        height: 100%;
        padding: 20px 10px 0 0;
        color:#1890ff;
        cursor:pointer;
    }
    &.pub-list{
        .same-active2{
            display: block;
            width: 0px;
            height: 20px;
            font-size: 20px;
            margin: 30px -15px 0 15px!important;
            color:#55a12f;
            opacity:0;
        }
    }
`;

export const MiddleChceckBox = styled.div`
    width:0;
    opacity:0;
    border-radius:50%;
    border:1px solid #dcdcdc;
    background:#fff;
    float:left;
    margin:20px -5px 0 15px;
    position:relative;
    span{
        color:#55a12f;
        position:absolute;
        top: 0px;
        left: -1px;
        font-size: 19px;
    }
    &.middle-check-box-show{
        width:20px;
        height:20px;
        opacity:1;
        span{
            display:block;
        }
    }
    transition:all ease-in .2s;
`;


export const CustomerInfo = styled.div`
    width: 60%;
    height:80px;
    float:left;
    p:nth-child(1) span:nth-child(1){
        font-size:16px;
        color:#333;
        max-width: 100px;
        display: inline-block;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    p:nth-child(1) span:nth-child(2){
        font-size:16px;
        color:#999;
        margin-left:20px;
    }
    p:nth-child(1){
        margin: 18px 0 0 0;
    }
    p:nth-child(2){
        font-size:14px;
        color:#999;
        margin: 12px 0 0 0;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    .balance-left{
        padding-left:20px;
    }
`;


export const EditWrapper = styled.div`
    display:flex;
    width:100%;
    height:75px;
    position:absolute;
    left:0;
    bottom:-75px;
    background:#fff;
    border:1px solid #f7f7f7;
    box-sizing:content-box;
    transition:all ease-in .2s;
    &.editWrapper-active{
        bottom:0px;
    }
`;

export const EditItem = styled.div`
    flex:1;
    height:100%;
    text-align:center;
    font-size:14px;
    color:#999;
    padding-top:10px;
    cursor:pointer;
    .iconfont{
        font-size:20px;
    }
    &:hover{
        color:#666;
    }
    p{
        margin-top:10px;
    }
    
    .reset-shanchu{
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${shanchu}) 100% 100% no-repeat;
        background-size: cover;
        margin: 5px auto;
    }
    
    .reset-yijiao{
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${yijiao}) 100% 100% no-repeat;
        background-size: cover;
        margin: 5px auto;
    }
`;

// RightWrapper details

export const RightHeaderWrapper = styled.div`
    width:100%;
    height:60px;
    border-bottom:1px solid #f7f7f7;
    display:flex;
    justify-content:flex-end;

    &.isOpacity{
        opacity:0;
        display:block;
        width:0;
    }
    padding-right:30px;
    .iconfont{
        margin-right:20px;
    }
    
    .reset-shanchu{
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${shanchu}) 100% 100% no-repeat;
        background-size: cover;
        margin: 25px 25px;
        cursor:pointer;
    }
    
    .reset-fangbj{
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${fbj}) 100% 100% no-repeat;
        background-size: cover;
        margin: 25px 25px 0 0;
        cursor:pointer;
    }
    
    .reset-yijiao{
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        overflow: hidden;
        background:url(${yijiao}) 100% 100% no-repeat;
        background-size: cover;
        margin: 25px 25px 0 0;
        cursor:pointer;
    }
`;

export const RightWrapper = styled.div`
    width:90%;
    margin:30px auto;
    
    .example {
        width:80px;
        margin:30px auto;
        font-size:30px;
        text-align: center;
        border-radius: 4px;
    }
    .ant-upload-list-item-actions i svg{
        
    }
    .list-photo{
        margin:5px 10px 10px 0;
        .clear{
            clear:both;
        }
    }
`;

export const RightContentWrapper = styled.table`
    .no-data{
        color:#999;
        font-size:13px;
    }
    width:100%;  
    border:1px solid #f7f7f7;
    tr{
        height:50px;
        line-height:50px;
        border-bottom:1px solid #f7f7f7;
    }
    tr:last-child{
        border-bottom:none;
    }
    tr td:nth-child(1){
        color:#333;
        font-size:14px;
        padding-left:15px;
        width:40%;
    }
    tr td:nth-child(2){
        color:#666666;
        font-size:14px;
        padding-left:10px;
        border-left:1px solid #f7f7f7;
        width:60%;
    }
    .weight-b{
        b{
            font-weight:bold;
            color:#000;
        }
    }
`;

export const RightCarousel = styled.div`
    width:100%;
    height:95px;
    
    margin:30px auto;
    &.swiper-container{
        width:100%;
        position:relative;
        margin:30px auto;
        .iconfont{
            position:absolute;
        }
        .iconfont:nth-child(1){
            top:15px;
            left:0;
        }
        .iconfont:nth-child(2){
            right:0;
            top:15px;
        }
        .swiper-button-next, .swiper-button-prev{
            background:none;
        }
        .swiper-pagination-bullet-active{
            background: #55a12f;
        }
    }
    .swiper-slide{
        flex:1;
        text-align:center;
    }
    & .swiper-wrapper{
        position: absolute;
        left: 0;
        width: 100%;
        display:flex;
    }
    .swiper-button-disabled{
        display:none;
    }
`;

export const FileWrapper = styled.div`
    oveflow:hidden;
`;

export const FileItem = styled.div`
    cursor:pointer;
    display:inline-block;
    height:35px;
    line-height:35px;
    & .iconfont{
        margin-right:10px;
        font-size:16px;
    }
    padding:0 20px;
    margin:5px 10px 5px 0;
    border-radius:3px;
    border:1px solid #dcdcdc;
`;


export const TransferWrapper = styled.div`
    position:absolute;
    left:0;
    bottom:-100%;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.4);
    transition:all ease-in .3s;
    opacity:0;
    &.active{
        opacity:1;
        bottom:0;
    }
`;

export const PositionWrapper = styled.div`
    position:relative;
    height:100%;
    .botton-wrapper{
        position:absolute;
        bottom:0;
        background:#fff;
        height:100px;
        width:100%;
        z-index:2;
    }
    .top-wrapper{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        z-index:1;
    }
`;

export const Tolist = styled.div`
    position:absolute;
    left:0;
    z-index:2;
    bottom:100px;
    width:100%;
    height:60%;
    overflow:auto;
    background:#fff;
    
    &::-webkit-scrollbar-track-piece { 
        background-color:#f7f7f7;
    }
    &.editSrollBar::-webkit-scrollbar{
        width: 8px;
    }
    &.editSrollBar::-webkit-scrollbar-thumb
    {
        background-color:#f6f6f6;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
`;

export const TotransferItem = styled.div`
    clear:both;
    padding:15px 40px;
    border-bottom:1px solid #f7f7f7;
    background:#f7f7f7;
    &.active{
        background:#fff;
    }
    cursor:default;
    .no-avetor{
        font-size:30px;
        color:#ddd;
        float:left;
        margin:0;
    }
    &.trans-box{
        padding:10px 20px;
        background:#fff;
    }
    &.trans-box:hover{
        background:#f7f7f7;
    }
    &.trans-box-active{
        background:#f3f3f3;
    }
    &:hover{
        background:#fff;
    }
    .moren-img{
        display:block;
        width:40px;
        height:40px;
        border-radius:50%;
        float:left;
        margin:0px 0px 0px 0px;
        overflow:hidden;
        background:url(${imgurl}) 100% 100% no-repeat;
        background-size:cover;
    }
`;

export const ToTraItem = styled.div`
    .title{
        font-size:16px;
        color:#333;
        padding-right:20px;
        padding-bottom:20px;
    }
    .mobile{
        font-size:14px;
        color:#999;
    }
    .idCard{
        font-size:14px;
        color:#999;
    }
    &.trans-item{
        display:inline-block;
        margin-top:0px;
    }
    .trans-title{
        float:left;
        margin-left:20px;
        padding-bottom:0px;
        max-width:150px;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height:20px;
    }
    .trans-mobile{
        line-height:20px;
        max-width:100px;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .trans-idCard{
        padding-left:20px;
        line-height: 25px;
    }
`;

export const TotransferButton = styled.div`
    width:300px;
    height:40px;
    background:#55a12f;
    font-size:13px;
    text-align:center;
    line-height:40px;
    color:#fff;
    border-radius:5px;
    margin:30px auto 0;
    cursor:pointer;
    .trans-send{
        width:260px!important;
    }
`;

export const SearchMoreCodition = styled.div`
    width:100%;
    display:flex;
    .condition-select{
        flex:1;
        padding:5px 5px;
        margin-top: 5px;
        >p{
            float:left;
            font-size:14px;
            margin-top: 4px;
        }
        .ant-select{
            margin-top:-10px!important;
            float:right;
            margin-left:10px!important;
            margin-top:0px!important;
           
        }
        .ant-select-selection__placeholder, .ant-select-search__field__placeholder{
            font-size:12px;
            line-height:15px;
        }
        .ant-select-selection--single{
            height:25px;
            
        }
        .ant-select-selection-selected-value{
            line-height:20px;
        }
        .small-input{
            display:block;
        }
        .ant-select-arrow{
            right:5px;
        }
        
    }
    &.public-condition{
        .ant-input{
            height:30px;
        }
        .condition-select{
            margin-top: 0px;
            >p{
                margin-top: 0px;
            }
        }
        
    }
`;



// 右边弹出
export const RightBlock = styled.div`
    position:fixed;
    right:0;
    top:60px;
    width:0px;
    overflow: hidden;
    background:#fff;
    z-index:1;
    box-shadow: -4px 0 5px -3px #eee;
    transition:all ease-in .2s;
    &.active{
        width:350px;
    }
    .chat-textarea{
        width:240px;
        margin:20px auto;
        display: block;
        background: #f7f7f7;
    }
    .chat-title{
        padding:20px 0 10px 30px;
    }
    >div{
        position:relative;
        height:100%;
    }
    .chat-send{
        width:250px;
        height:35px;
        color:#fff;
        background:#55a12f;
        text-align:center;
        line-height:35px;
        border-radius:5px;
        position:absolute;
        left:50%;
        margin-left:-125px;
        bottom:50px;
        cursor:pointer;
    }
`;

export const Totranslist = styled.div`
    height:80%;
    background:#fff;
    overflow-y:auto;
    background:#f7f7f7;
    &::-webkit-scrollbar-track-piece { 
        background-color:#f7f7f7;
    }
    &.editSrollBar::-webkit-scrollbar{
        width: 8px;
    }
    &.editSrollBar::-webkit-scrollbar-thumb
    {
        background-color:#f6f6f6;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
`;


export const CareHeader = styled.div`
    height:100%;
    width:100%;
`;


export const CareTitle = styled.div`
    height:100%;
    line-height:60px;
    padding-left:30px;
    float:left;
`;


export const CareButton = styled.div`
    height:100%;
    float:right;
    diisplay:flex;
    justify-content: flex-end;
    button{
        height:30px;
        outline:none;
        margin: 0;
        padding: 0;
        border: 1px solid transparent;
        outline: none;   
        padding:2px 20px; 
        color:#fff;
        margin-top:15px;
        border-radius:2px;
    }
    button:nth-child(1) {
        background:red;
        margin-right:30px;
    }
    button:nth-child(2) {
        background:#55a12f;
    }
`;


export const CareReason = styled.div`
    position:absolute;
    top:60px;
    right:0px;
    width:0px;
    transition:all ease-in .2s;
    z-index:1;
    overflow: hidden;
    &.active{
        box-shadow: -4px 5px 5px -3px #eee;
        background:#fff;
        width:300px;
    }
    .care-textarea{
        width:240px;
        margin:20px auto;
        display: block;
        background: #f7f7f7;
    }
    .care-title{
        padding:20px 0 10px 30px;
    }
    .care-send{
        width:250px;
        height:35px;
        color:#fff;
        background:#55a12f;
        text-align:center;
        line-height:35px;
        border-radius:5px;
        cursor:pointer;
        margin:20% auto 5%;
    }
`;

// 审核员

// CareReason
