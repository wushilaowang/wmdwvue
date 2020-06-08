<template>
    <div>
        <div class="login-header"></div>
        <div class="login-body">
            <div>{{loginPageText.systemName}}</div>
            <div class="login-swiper">
                <Swiper>
                    <SwiperItem>
                        
                    </SwiperItem>
                </Swiper>
                
            </div>

        </div>
        <div>
            <div>系统主管单位:{{loginPageText.SystemAdminUnit}}</div>
            <div>{{loginPageText.companyInfo}}</div>
            <div>技术支持联系电话：{{loginPageText.contactTel}}</div>
        </div>
    </div>
</template>

<script>
import {config} from '../network/login'
import Store from '../store/index'
import {Swiper, SwiperItem} from '../components/common/swiper/index'
export default {
    name: 'Login',
    components: {
        Swiper,
        SwiperItem
    },
    data() {
        return {
            loginPageText: {
                systemName: "",
                contactTel: "",
                companyInfo: "",
                SystemAdminUnit: ""
            }
        }
    },
    computed: {
       
    },
    mounted() {
        
    },
    methods: {
        
    },
    created() {
        const that = this;
        config().then(res => {
            const result = res.data.data
            Store.dispatch('actionSetConfig', result)
            result.map(item => {
                if(item.cfgkey == "systemName") {
                    that.loginPageText.systemName = item.description
                }else if(item.cfgkey == "contactTel") {
                    that.loginPageText.contactTel = item.description
                }else if(item.cfgkey == "companyInfo") {
                    that.loginPageText.companyInfo = item.description
                }else if(item.cfgkey == "SystemAdminUnit") {
                    that.loginPageText.SystemAdminUnit = item.description
                }
            })
        })
    }
}
</script>

<style scoped>
    .login-header {
        width: 100%;
        padding-top: 2%;
        background-color: #26468d;
    }
</style>