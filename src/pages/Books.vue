<template>
    <div class="parallax-window" data-parallax="scroll" data-image-src="img/bg-img-05.jpg">

        <form id="main" v-cloak>
            <div class="bar">
                <!-- 这两个按钮用于转换页面布局形式，使得UL布局正确显示 -->
                <span>书籍展览</span>
                <button class="btn btn-default btn-lg" v-if="isManager" @click="add_book=!add_book">添加书籍 </button>
                <div>
                    <a class="list-icon" v-bind:class="{ 'active': layout == 'list'}" v-on:click="layout = 'list'"></a>
                    <a class="grid-icon" v-bind:class="{ 'active': layout == 'grid'}" v-on:click="layout = 'grid'"></a>
                </div>

            </div>
            <div v-if="!add_book">
                <ul v-if="layout == 'grid'" class="grid">
                    <!-- 这种布局只显示缩略图片不显示文字 -->
                    <li v-for="(a,index) in books" :key="index">
                        <img v-bind:src="a.image" alt="查看详情" @click="detail(a,index)"/>
                    </li>
                </ul>

                <ul v-if="layout == 'list'" class="list">
                    <!-- 这种布局显示小图片和文字 -->
                    <li v-for="(a,index) in books" :key="index">
                        <div style="display: flex; justify-content: space-around" >
                            <img v-bind:src="a.image" alt="查看详情" style="width: 194px;height: 200px" />
                            <div style="margin-top: 20px; width: 400px">
                                <h3>{{a.title}}</h3>
                                <h5>售价：  {{a.price}}  元</h5>
                                <h5 @click="detail(a)">详情……</h5>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
                <form   class="form-check " style="display: flex;flex-direction: column;justify-content: center;width:60%; margin-left: 150px; background-color: black">
                    <div class="input-group">
                        <label class="col-sm-2 control-label" for="title">书名</label>
                        <div class="col-md-10">
                            <input type="text" id="title" class="form-control" placeholder="请输入标题" v-model="Book.title" required autofocus >
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="col-sm-2 control-label" for="writer">作者</label>
                        <div class="col-sm-10">
                            <input type="text" id="writer" class="form-control" placeholder="请输入作者" v-model="Book.writer" required autofocus >
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="col-sm-2 control-label" for="inventory">库存</label>
                        <div class="col-sm-10">
                            <input type="text" id="inventory" class="form-control" placeholder="请输入库存" v-model="Book.inventory" required autofocus >
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="col-sm-2 control-label" for="price">价格</label>
                        <div class="col-sm-10">
                            <input type="text" id="price" class="form-control" placeholder="请输入价格" v-model="Book.price" required autofocus >
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="col-sm-2 control-label" for="tranch">种类</label>
                        <div class="col-sm-10">
                            <label id ="tranch" style="margin-left: 30px">
                                <input  style="margin-left: 15px" type="radio" name="DoorCt" value="literature" v-model="Book.tranch">literature
                                <input style="margin-left: 15px"  type="radio" name="DoorCt" value="magazine" v-model="Book.tranch">magazine
                                <input  style="margin-left: 15px" type="radio" name="DoorCt" value="science"  v-model="Book.tranch">science
                            </label>
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="col-sm-2 control-label" for="isbn">ISBN</label>
                        <div class="col-sm-10">
                            <input type="text" id="isbn" class="form-control" placeholder="请输入ISBN" v-model="Book.ISBN" required autofocus >
                        </div>
                    </div>
                    <label  class="sr-only">简介</label>
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 5}"
                            placeholder="请输入简介"
                            v-model="Book.introduction" required autofocus>
                    </el-input>
                    <button class="btn btn-group-lg btn-primary btn-block" style="margin-top: 20px"  @click="book_added(Book)">确认添加</button>
                </form>

            </div>
        </form>
    </div>
</template>

<script>
    import {mapState} from'vuex'
    export default {
        name: "Books",
        data() {
            return{
                // 布局形式可能的值为grid或者list
                layout: 'grid',
                add_book: false,
                Book:{
                    title:"",
                    author:"",
                    price:"",
                    inventory:"",
                    ISBN:"",
                    introduction:"",
                    tranch:""
                }
            }
        },
        created(){
            this.$store.dispatch('Books/getBooks');
        },
        methods:{
          detail(index) {
              this.$store.commit('Books/changeAim', index);
              this.$router.push('/Book');
          },
            book_added(Book){
              this.$store.dispatch('Books/addBook',Book)
              this.add_book = !this.add_book;

          }
        },
        computed: {
            ...mapState({
                books: state => state.Books.books,
                isManager: state => state.Person.isManager
            })
        }
    }
</script>

<style scoped>
    [v-cloak] {
        display: none;
    }

    *{
        margin:0;
        padding:0;
    }

    a, a:visited {
        outline:none;
        color:#389dc1;
    }

    a:hover{
        text-decoration:none;
    }

    section, footer, header, aside, nav{
        display: block;
    }

    .bar{
        display: flex;
        justify-content: space-between;
        box-shadow: 0 1px 1px #ccc;
        border-radius: 5px;
        width: 80%;
        padding: 10px;
        margin: 45px auto;
        position:relative;
        text-align:right;
        line-height: 1;
    }

    .bar a{
        background: #ffe055 center center no-repeat;
        width:35px;
        height:35px;
        display:inline-block;
        text-decoration:none !important;
        margin-right:5px;
        cursor:pointer;
    }

    .bar a.active{
        background-color:orange;
    }

    .bar a.list-icon{
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzNkFCQ0ZBMTBCRTExRTM5NDk4RDFEM0E5RkQ1NEZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzNkFCQ0ZCMTBCRTExRTM5NDk4RDFEM0E5RkQ1NEZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjM2QUJDRjgxMEJFMTFFMzk0OThEMUQzQTlGRDU0RkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjM2QUJDRjkxMEJFMTFFMzk0OThEMUQzQTlGRDU0RkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7h1bLqAAAAWUlEQVR42mL8////BwYGBn4GCACxBRlIAIxAA/4jaXoPEkMyjJ+A/g9MDJQBRhYg8RFqMwg8RJIUINYLFDmBUi+ADQAF1n8ofk9yIAy6WPg4GgtDMRYAAgwAdLYwLAoIwPgAAAAASUVORK5CYII=);
    }

    .bar a.grid-icon{
        background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBEQkMyQzE0MTBCRjExRTNBMDlGRTYyOTlBNDdCN0I4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBEQkMyQzE1MTBCRjExRTNBMDlGRTYyOTlBNDdCN0I4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MERCQzJDMTIxMEJGMTFFM0EwOUZFNjI5OUE0N0I3QjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MERCQzJDMTMxMEJGMTFFM0EwOUZFNjI5OUE0N0I3QjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4MjPshAAAAXklEQVR42mL4////h/8I8B6IGaCYKHFGEMnAwCDIAAHvgZgRyiZKnImBQsACxB+hNoDAQyQ5osQZIT4gH1DsBZABH6AB8x/JaQzEig++WPiII7Rxio/GwmCIBYAAAwAwVIzMp1R0aQAAAABJRU5ErkJggg==);
    }

    .bar input{
        background:#fff no-repeat 13px 13px;

        border: none;
        width: 100%;
        line-height: 19px;
        padding: 11px 0;

        border-radius: 2px;
        box-shadow: 0 2px 8px #c4c4c4 inset;
        text-align: left;
        font-size: 14px;
        font-family: inherit;
        color: #738289;
        font-weight: bold;
        outline: none;
        text-indent: 40px;
    }

    /*-------------------------
     列表布局
    --------------------------*/

    ul.list{
        list-style: none;
        width: 80%;
        margin: 0 auto;
        text-align: left;
    }

    ul.list li{
        border-bottom: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;
        cursor: pointer;
    }

    ul.list li img{
        height:200px;
        float:left;
        border:none;
    }

    ul.list li p{
        font-weight: bold;
        color:#6e7a7f;
    }

    /*-------------------------
     网格布局
    --------------------------*/

    ul.grid{
        list-style: none;
        width: 80%;
        margin: 0 auto;
        text-align: left;
    }

    ul.grid li{
        padding: 1px;
        display: flex;
        justify-content: center;
        float:left;
        width: 25%;
        cursor: pointer;
        box-sizing: border-box;
    }

    ul.grid li img{
        height:280px;
        object-fit: cover;
        display:block;
        border:none;
        padding: 10px;
        box-sizing: border-box;
    }

    /* 添加书籍*/

    .form-signin {
        width: 100%;
        max-width: 450px;
        padding: 15px;
        margin: auto;
    }
    .form-signin .checkbox {
        font-weight: 400;
    }
    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 10px;
    }
</style>

