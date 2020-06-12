<template>
    <div class="table">      
        <div class="thead">
            <div v-for="(item, headIndex) in tableData.thead" :key="headIndex">{{item}}</div>
        </div>
        <div class="tbody" v-for="(item, bodyIndex) in tableData.tbody" :key="bodyIndex[0]">
            <div v-for="(citem, cindex) in item.text" :key="cindex">{{citem}}</div>
            <div v-for="(fitem, findex) in item.function" :key="'f'+findex"><a>{{fitem}}</a></div>
        </div>
        <div class='page'>
            共<span>{{tableData.page.totalPage}}</span>页
            <a @click="handlePre">+</a>第<span>{{tableData.page.page}}</span>页<a @click="handleNext">-</a>
            <input v-model="tableData.page.limit"/>条/页
        </div>
    </div>
</template>

<script>
import {queryUnit} from '../../../network/table';
import Store from '../../../store/index'
export default {
    name: 'Table',
    props: {
        menuUrl: Object
    },
    data() {
        return {
            tableData: {
                tbody: [],
                thead: [],
                page: {
                    totalPage: 1,
                    page: 1,
                    limit: 10
                }
            }
        }
    },
    methods: {
        handlePre() {
            if(this.tableData.page.page > 1) {
                this.tableData.page.page -= 1;
                this.queryUnit()
            }
        },
        handleNext() {
            if(this.tableData.page.page < this.tableData.page.totalPage) {
                this.tableData.page.page += 1;
                this.queryUnit()
            }
        },
        handleInputChange(e) {
            console.log(e)
        },
        //单位
        queryUnit() {
            const that = this;
            console.log(this.menuUrl)
            if(this.menuUrl.menuUrl == "DanWeiGuanLi") {
                const param = {
                    data: {
                        _limit: that.tableData.page.limit,
                        _page: that.tableData.page.page
                    }
                }
                queryUnit(param).then(res => {
                    console.log(res.data.data)
                    that.tableData.page.totalPage = res.data.data.totalPage,
                    that.tableData.page.page = res.data.data._page
                    // that.tableData = res.data.data;
                    that.tableData['thead'] = ['编号', 'ID', '单位全称', '所属地区', '单位分级', '单位等级', '操作'];
                    that.tableData['tbody'] = [];
                    let index = 0;
                    const districtList = eval("("+Store.state.district+")");
                    const sysParam = eval("("+Store.state.sysParam+")");
                    let districtName = '';
                    let rank = "";
                    let unitLevel = "";
                    res.data.data.result.map(item => {
                        districtList.map(ditem => {
                            if(item.districtId == ditem.districtId) {
                                districtName =ditem.cascadeName
                            }
                        })
                        sysParam.map(sitem =>{
                            if(sitem.paramKind == 'UnitRank' && sitem.paramCode == item.rank) {
                                rank = sitem.paramValue
                            }
                            if(sitem.paramKind == 'UnitLevel' && sitem.paramCode == item.unitlevel) {
                                unitLevel = sitem.paramValue
                            }
                        })
                        index += 1;
                        that.tableData['tbody'].push({
                            text: [index, item.unitid, item.fullname, districtName, rank, unitLevel],
                            function: ['查看']
                        })
                    })
                    console.log(that.tableData)
                    console.log(eval("("+Store.state.sysParam+")"))
                })
            }

        }
    },
    computed: {

    },
    mounted() {
        this.queryUnit()
    },
    created() {
        
    }
}
</script>

<style scoped>
    .table {
        flex: 1;
        position: relative;
    }
    .thead, .tbody {
        display: flex;
        text-align: center;
    }
    .thead {
        background-color: #e2f0fb;
        height: 40px;
        color: #436ba1;
    }
    .tbody {
        height: 32px;
    }
    .thead div, .tbody div {
        flex: 1;
        margin: 0 0;
        border-top: 1px solid #a7cae1;
        border-right: 1px solid #a7cae1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 4px;
    }
    .thead div:nth-child(1) {
        border-left: solid 1px #a7cae1;
    }
    .tbody div:nth-child(1) {
        border-left: solid 1px #a7cae1;
    }
    .tbody:nth-last-child(1)  div {
        border-bottom: 1px solid #a7cae1;
    }

    a {
        color: blue;
    }
    a:hover {
        cursor: pointer;
    }

    .page {
        position: absolute;
        bottom: 10px;
        margin: 0 auto;
    }
</style>