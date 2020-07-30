import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Tooltip, Modal, message, Select, Empty, Drawer, Input  } from 'antd';
import { handlecustomDelete, getCustomerList, getCustomerDetail, toTransfer, sureToTransfer, getsystemData, handleExport, handleAllExport } from '../../../api'
import { 
    Customer,
    MiddleHeader,
    OperateWrapper,
    MiddleListWrapper,
    MiddleList,
    CustomerInfo,
    SearchWrapper,
    AddCustomerWrapper,
    SearchInput,
    SearchCondition,
    AddButtonWrapper,
    AddCusButton,
    MiddleChceckBox,
    EditWrapper,
    EditItem,
    TransferWrapper,
    PositionWrapper,
    Tolist,
    TotransferItem,
    ToTraItem,
    TotransferButton,
    SearchMoreCodition

} from '../style'

class MiddleWrapper extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isAdd:false,
            search:false,
            edit:false,
            visible:false,
            visibleNew:false,
            user:JSON.parse(sessionStorage.getItem("user")),
            load:true,
            name:'',
            idcard:'',                    // 身份证
            mobilePhone:'',
            companyName:'',               // 公司名称
            yearlyTurnoverSymbol:'',      // 年营业额符号（><=）
            yearlyTurnover:'',           // 年营业额（万元）   
            propertySymbol:'',          // 资产情况符号（><=）
            property:'',                // 资产情况（万元）
            liabilitiesSymbol:'',       // 负债情况符号（><=）
            liabilities:'',             // 负债情况（万元）
            demandAmountSymbol:'',      // 需求金额符号（><=）
            demandAmount:'',            // 需求金额（万元）
            existingBusinessAmount:'',  // 已发生业务金额
            orgNo:'',
            orgName:'',
            cabinetNo:'',
            customerType:'',
            industryClass:'',
            existingBusinessType:'',
            existingBusinessAmountSymbol:'',
            existingBusinessAmount:'',
            status:-1,                  // 审核状态 -1 所有 0 未审核 1已审核
            total:0,
            pageNum:1,  
            pageSize:10,
            customerId:'',
            totransfer:[],
            systemData:{}
        }

        this.handleCancelSearch = this.handleCancelSearch.bind(this)

    }

    onClose = () => {
        this.setState({
          visible: false,
          visibleNew: false
        });
    };

    render () {
        const { isAddAction } = this.props;
        const Option = Select.Option;
        let homeList = []
        if(this.props.homeList) {
            homeList = this.props.homeList.toJS()
        }
        const { isAdd, search, edit, totransfer, yearlyTurnoverSymbol, propertySymbol, liabilitiesSymbol, demandAmountSymbol, status,
            visible, name, idcard, mobilePhone, companyName, visibleNew, orgNo, orgName, cabinetNo, systemData, customerType, industryClass,
            existingBusinessType, existingBusinessAmountSymbol, existingBusinessAmount, total
        } = this.state;
        const user = JSON.parse(sessionStorage.getItem("user"))
        // console.log(totransfer)
        const confirm = Modal.confirm;
        
        return (
            <Customer className="customer" ref={(middleWrapper) => {this.modalWrapper = middleWrapper}}>
                <MiddleHeader>
                    {
                        user.userType == 3?
                        <Fragment>
                            <span>客户审核</span>
                            <span className="searchTotal">共有记录 {total} 条</span>
                            <OperateWrapper>
                            <Tooltip title="搜索" onClick={() => {this.handleSearchCustomerNew(search)}}>
                                <div className="reset-sousuo"></div>
                            </Tooltip>
                            </OperateWrapper>
                        </Fragment>
                        :
                        <Fragment>
                            <span>客户管理</span>
                            <span className="searchTotal">共有记录 {total} 条</span>
                            <OperateWrapper>
                                {
                                    user.userType == 4?
                                    <Fragment>
                                        <Tooltip title="导出客户" onClick={() => {this.exportCus()}}>
                                            <div className="reset-daochu"></div>
                                        </Tooltip>
                                        <Tooltip title="搜索" onClick={() => {this.handleSearchCustomer(search)}}>
                                            <div className="reset-sousuo"></div>
                                        </Tooltip>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <Tooltip title="导出客户" onClick={() => {this.exportCus('khjl')}}>
                                            <div className="reset-daochu"></div>
                                        </Tooltip>
                                        <Tooltip title="新建客户" onClick={() => {this.addCustomer(isAdd)}}>
                                            {/* <span className="iconfont iconfont-add">&#xe64c;</span> */}
                                            <div className="reset-jia"></div>
                                        </Tooltip>
                                        <Tooltip title="搜索" onClick={() => {this.handleSearchCustomer(search)}}>
                                            {/* <span className="iconfont">&#xe7c0;</span> */}
                                            <div className="reset-sousuo"></div>
                                        </Tooltip>
                                        <Tooltip title="管理" onClick={() => {this.handleEditCustomer(edit, homeList, this.editWrapperEl, this.middleListWrapperEl)}}>
                                            {/* <span className="iconfont">&#xe693;</span> */}
                                            <div className="reset-bianji"></div>
                                        </Tooltip>
                                    </Fragment>
                                }
                                
                            </OperateWrapper>
                        </Fragment>
                    }
                    
                </MiddleHeader>
                   

                <MiddleListWrapper className={this.state.visible || this.state.visibleNew?"editSrollBar editSrollBar-hidden":"editSrollBar"} ref={(middleListWrapper) => {this.middleListWrapperEl = middleListWrapper}}>
                    {/* 新建客户 */}
                    <AddCustomerWrapper 
                        className={isAdd?"addcustomer-show":""}
                        ref={(addcusEl) => { this.addcusEl = addcusEl}}
                        onClick={() => {this.handleAdd(isAddAction, homeList)}}>
                        新建客户
                    </AddCustomerWrapper>

                    <Drawer
                        placement="top"
                        closable={false}
                        destroyOnClose={true}
                        visible={this.state.visible}
                        getContainer={'.editSrollBar'}
                        onClose={this.onClose}
                        style={{ position: 'absolute' }}
                    >
                        <SearchCondition className="public-condition">
                            <div className="condition-select">
                                <p>机构号</p>
                                <Input placeholder="请输入" ref={i => this.organizeNo = i} value={orgNo} onChange={() => this.searchData(13)} />
                            </div>
                            <div className="condition-select">
                                <p>机构名称</p>
                                <Input placeholder="请输入" ref={i => this.organizeName = i} value={orgName} onChange={() => this.searchData(14)} />
                            </div>
                        </SearchCondition>
                        <SearchCondition className="public-condition">
                            <div className="condition-select">
                                <p>柜员号</p>
                                <Input placeholder="请输入" ref={i => this.tellerNo = i} value={cabinetNo} onChange={() => this.searchData(15)} />
                            </div>
                            <div className="condition-select">
                                <p>客户姓名</p>
                                <Input placeholder="请输入" ref={i => this.cusName = i} value={name} onChange={() => this.searchData(1)} />
                            </div>
                        </SearchCondition>
                        <SearchCondition className="public-condition">
                            <div className="condition-select">
                                <p>身份证号</p>
                                <Input placeholder="请输入" ref={i => this.cusIdCard = i} value={idcard} onChange={() => this.searchData(2)} />
                            </div>
                            <div className="condition-select">
                                <p>手机号</p>
                                <Input placeholder="请输入" ref={i => this.cusPhone = i} value={mobilePhone} onChange={() => this.searchData(3)} />
                            </div>
                        </SearchCondition>

                        <SearchCondition className="public-condition">
                            <div className="condition-select">
                                <p>公司名称</p>
                                <Input placeholder="请输入" ref={i => this.cusCompany = i} value={companyName} onChange={() => this.searchData(4)} />
                            </div>
                            <div className="condition-select">
                                <p>行业分类</p>
                                <Select
                                    style={{ width: '100%', marginBottom:0 }}
                                    placeholder="请选择"
                                    optionFilterProp="children"
                                    getPopupContainer={ triggerNode => triggerNode.parentNode}
                                    onChange={(value) => this.searchData(17, value)}
                                >
                                    {
                                        systemData.industryClass && systemData.industryClass.map((item, index) => {
                                            return (
                                                <Option key={item} value={item}>{item}</Option>
                                            )
                                        })
                                    }
                                    
                                </Select>
                            </div>
                        </SearchCondition>
                        <SearchCondition className="public-condition">
                            <div className="condition-select">
                                <p>客户类型</p>
                                <Select
                                    style={{ width: '100%', marginBottom:0 }}
                                    placeholder="请选择"
                                    optionFilterProp="children"
                                    getPopupContainer={ triggerNode => triggerNode.parentNode}
                                    onChange={(value) => this.searchData(16, value)}
                                >
                                    {
                                        systemData.customerType && systemData.customerType.map((item, index) => {
                                            return (
                                                <Option key={item} value={item}>{item}</Option>
                                            )
                                        })
                                    }
                                    
                                </Select>
                            </div>
                            <div className="condition-select">
                                <p>业务种类</p>
                                <Select
                                    style={{ width: '100%', marginBottom:0 }}
                                    placeholder="请选择"
                                    optionFilterProp="children"
                                    getPopupContainer={ triggerNode => triggerNode.parentNode}
                                    onChange={(value) => this.searchData(18, value)}
                                >
                                    {
                                        systemData.existingBusinessType && systemData.existingBusinessType.map((item, index) => {
                                            return (
                                                <Option key={item} value={item}>{item}</Option>
                                            )
                                        })
                                    }
                                    
                                </Select>
                            </div>
                        </SearchCondition>


                        <SearchMoreCodition className="public-condition">
                            <div className="condition-select">
                                <p>年营业额</p>
                                <Select
                                    style={{ width: '55%' }}
                                    placeholder="请选择"
                                    onChange={(value) => this.searchData(5, value)}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=">">&gt;</Option>
                                    <Option value="<">&lt;</Option>
                                    <Option value="=">=</Option>
                                </Select>
                                <Input 
                                    className="small-input"
                                    placeholder="年营业额(万元)"
                                    ref={i => this.yearlyTurnoverEl = i}
                                    onChange={() => this.searchData(6)}
                                ></Input>
                            </div>
                            <div className="condition-select">
                                <p>资产情况</p>
                                <Select
                                    style={{ width: '55%' }}
                                    placeholder="请选择"
                                    onChange={(value) => this.searchData(7, value)}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=">">&gt;</Option>
                                    <Option value="<">&lt;</Option>
                                    <Option value="=">=</Option>
                                </Select>
                                <Input 
                                    className="small-input"
                                    placeholder="资产情况(万元)"
                                    ref={i => this.propertyEl = i}
                                    onChange={() => this.searchData(8)}
                                ></Input>
                            </div>
                        </SearchMoreCodition>

                        <SearchMoreCodition className="public-condition">
                            <div className="condition-select">
                                <p>负债情况</p>
                                <Select
                                    style={{ width: '55%' }}
                                    placeholder="请选择"
                                    onChange={(value) => this.searchData(9, value)}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=">">&gt;</Option>
                                    <Option value="<">&lt;</Option>
                                    <Option value="=">=</Option>
                                </Select>
                                <Input 
                                    className="small-input"
                                    placeholder="负债情况(万元)"
                                    ref={i => this.liabilitiesEl = i}
                                    onChange={() => this.searchData(10)}
                                ></Input>
                            </div>
                            <div className="condition-select">
                                <p>需求金额</p>
                                <Select
                                    style={{ width: '55%' }}
                                    placeholder="请选择"
                                    onChange={(value) => {this.searchData(11, value)}}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=">">&gt;</Option>
                                    <Option value="<">&lt;</Option>
                                    <Option value="=">=</Option>
                                </Select>
                                <Input 
                                    className="small-input"
                                    placeholder="需求金额(万元)"
                                    ref={i => this.demandAmountEl = i}
                                    onChange={() => this.searchData(12)}
                                ></Input>
                            </div>
                        </SearchMoreCodition>

                        <SearchMoreCodition className="public-condition">
                            <div className="condition-select">
                                <p>发生业务金额</p>
                                <Select
                                    style={{ width: '55%' }}
                                    placeholder="请选择"
                                    onChange={(value) => {this.searchData(19, value)}}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=">">&gt;</Option>
                                    <Option value="<">&lt;</Option>
                                    <Option value="=">=</Option>
                                </Select>
                                <Input 
                                    className="small-input"
                                    placeholder="已发生业务金额(万元)"
                                    ref={i => this.existAmountEl = i}
                                    onChange={() => this.searchData(20)}
                                ></Input>
                            </div>
                            {
                                user.userType == 2?
                                <div className="condition-select">
                                    <p>审核状态</p>
                                    <Select
                                        style={{ width: '55%' }}
                                        placeholder="请选择"
                                        onChange={(value) => {this.handledemandStatus(value)}}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="-1">全部</Option>
                                        <Option value="0">未审核</Option>
                                        <Option value="1">已审核</Option>
                                    </Select>
                                </div>
                                :<div className="condition-select"></div>
                            }
                            
                        </SearchMoreCodition>

                        <AddButtonWrapper>
                            <AddCusButton className="add-cancel" 
                                onClick={() => {this.handleCancelSearch()}}
                            >取消</AddCusButton>
                            <AddCusButton className="add-save"
                                onClick={() => {this.handleSaveSearch()}}
                            >查询</AddCusButton>
                        </AddButtonWrapper>

                    </Drawer>

                    


                    {/* 审核员搜索 */}
                    {
                        user.userType == 3?
                        <Fragment>
                            <Drawer
                                placement="top"
                                closable={false}
                                destroyOnClose={true}
                                visible={this.state.visibleNew}
                                getContainer={'.editSrollBar'}
                                onClose={this.onClose}
                                style={{ position: 'absolute' }}
                            >
                            <SearchCondition className="public-condition">
                                <div className="condition-select">
                                    <p>客户姓名</p>
                                    <Input placeholder="请输入" ref={i => this.cusName = i} value={name} onChange={() => this.searchData(1)} />
                                </div>
                                <div className="condition-select">
                                    <p>身份证号</p>
                                    <Input placeholder="请输入" ref={i => this.cusIdCard = i} value={idcard} onChange={() => this.searchData(2)} />
                                </div>
                            </SearchCondition>

                            <SearchCondition className="public-condition">
                                <div className="condition-select">
                                    <p>手机号</p>
                                    <Input placeholder="请输入" ref={i => this.cusPhone = i} value={mobilePhone} onChange={() => this.searchData(3)} />
                                </div>
                                <div className="condition-select">
                                    <p>公司名称</p>
                                    <Input placeholder="请输入" ref={i => this.cusCompany = i} value={companyName} onChange={() => this.searchData(4)} />
                                </div>
                            </SearchCondition>
                                <AddButtonWrapper>
                                    <AddCusButton className="add-cancel" 
                                        onClick={() => {this.handleCancelSearchNew()}}
                                    >取消</AddCusButton>
                                    <AddCusButton className="add-save"
                                        onClick={() => {this.handleSaveSearchNew()}}
                                    >查询</AddCusButton>
                                </AddButtonWrapper>
                            </Drawer>
                        </Fragment>
                        :""
                    }
                    
                    
                    {
                        homeList && homeList.length?
                        homeList.map((item, index) => (
                            <MiddleList 
                                className={item.active?"selected list":" list"}
                                
                                key={item.customerId}>
                                {/* <MiddleChceckBox className={edit?"middleChceckBox":" "}>
                                    <span className={edit && item.active?"iconfont isShow":"iconfont isHide"}>&#xe617;</span>
                                </MiddleChceckBox> */}
                                <div className={edit && item.active?'iconfont same-active same-active2 click-active same-active3 reset-select':'iconfont same-active same-active2 reset-select'}></div>
                                {/* <span className={edit && item.active?'iconfont same-active same-active2 click-active same-active3':'iconfont same-active same-active2'}>&#xe617;</span> */}
                                <MiddleChceckBox className={edit?'same-active same-active1 click-active':'same-active same-active1'}></MiddleChceckBox>
                                
                                
                                {
                                    item.photo?<img src={item.photo} alt="" />
                                    :
                                    // <span className="iconfont">&#xe633;</span>
                                    <div className="moren-img"></div>
                                }
                                <CustomerInfo onClick={() => {this.handleList(homeList, item, index, item.customerId, item.active, edit)}}>
                                    <p>
                                        <span>{item.name}</span>
                                        <span>{item.mobilePhone}</span>
                                    </p>
                                    <p>
                                        {item.companyName || '暂无公司信息'}
                                    </p>
                                </CustomerInfo>
                                {
                                    user.userType == 2 && item.status == 1?
                                    <span className="stiick" onClick={() => {this.handleStick(item)}}>维护</span>
                                    :''
                                }
                                
                            </MiddleList>
                        ))
                        :
                        <Empty className='' description={'暂无数据'} />
                    }
                    
                    
                </MiddleListWrapper>

                {/* 底部批量操做部分 */}
                <EditWrapper ref={(editWrapper) => {this.editWrapperEl = editWrapper}}>
                    {
                        user.userType == 2?
                        <EditItem onClick={() => {this.handleToTransfer(this.transferWrapEl, homeList)}}>
                            {/* <span className="iconfont">&#xe60c;</span> */}
                            <div className="reset-yijiao"></div>
                            <p>移交</p>
                        </EditItem>
                        :""
                    }
                    
                    <EditItem onClick={() => {this.handledelete(confirm, homeList)}}>
                        {/* <span className="iconfont">&#xe619;</span> */}
                        <div className="reset-shanchu"></div>
                        <p>删除</p>
                    </EditItem>
                    {/* <EditItem>
                        <span className="iconfont">&#xe60a;</span>
                        <p>资料备份</p>
                    </EditItem> */}
                </EditWrapper>
                

                {/* 点击底部移交出现 */}
                <TransferWrapper ref={(transferWrap) => {this.transferWrapEl = transferWrap}}>
                    <PositionWrapper>
                        <div className="top-wrapper" onClick={() => {this.hideTotransfer(this.transferWrapEl)}}></div>
                        <Tolist className="editSrollBar">
                            {
                                totransfer && totransfer.map((item, index) => (
                                    <TotransferItem className={item.active?"active":""} key={item.cabinetNo}
                                        onClick={() => {this.handleTransfer(item, totransfer)}}
                                    >
                                        <ToTraItem>
                                            <span className="title">{item.name}</span>
                                            <span className="mobile">{item.cabinetNo}</span>
                                        </ToTraItem>
                                        <ToTraItem>
                                            {/* <span className="idCard"></span> */}
                                        </ToTraItem>
                                    </TotransferItem>
                                ))
                            }
                           
                        </Tolist>
                        <div className="botton-wrapper">
                            <TotransferButton onClick={() => {this.sureTransfer(totransfer, homeList, this.transferWrapEl)}}>确认移交</TotransferButton>
                        </div>
                    </PositionWrapper>
                    
                </TransferWrapper>
            </Customer>
        )
    }


    componentDidUpdate() {
        if(this.props.changeAddStatus) {
            this.setState({
                load:true,
                pageNum:1
            }, () => {
                this.getListData()
                return
            })
        }
        if(this.props.trans) {
            this.setState({
                load:true,
                pageNum:1,
                name:'',
                companyName:'',               // 公司名称
                yearlyTurnoverSymbol:'',      // 年营业额符号（><=）
                yearlyTurnover:'',           // 年营业额（万元）   
                propertySymbol:'',          // 资产情况符号（><=）
                property:'',                // 资产情况（万元）
                liabilitiesSymbol:'',       // 负债情况符号（><=）
                liabilities:'',             // 负债情况（万元）
                demandAmountSymbol:'',      // 需求金额符号（><=）
                demandAmount:''            // 需求金额（万元）
            }, () => {
                this.getListData()
                return
            })
        }
    }



    componentDidMount() {
        this.props.resetHeight()
        this.getListData()
        
        let el = this.middleListWrapperEl;
        el.addEventListener('scroll', () => {

            if(this.scrollTop() + this.windowHeight() >= (this.documentHeight() - 50/*滚动响应区域高度取50px*/)) {
                // console.log('bottom')
                this.getListData('concatList')
            }
        })
        
        getsystemData().then((res) => {
            let data = res.data;
            if(data.code === 1 && data.msg === 'success') {
                this.setState({
                    systemData:data.data
                }, () => {
                    // console.log(this.state.systemData)
                })
            }
        })

    }

    // 获取页面顶部被卷起来的高度函数
    scrollTop(){
        let el = this.middleListWrapperEl;
        return Math.max(
         //chrome
         el.scrollTop);
    }
    
    // 获取页面文档的总高度
    documentHeight(){
        let el = this.middleListWrapperEl;
        //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
        return Math.max(el.scrollHeight);
    }

    // 获取页面浏览器视口的高度
    windowHeight(){
        let el = this.middleListWrapperEl;
        //document.compatMode有两个取值。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
        return (el.compatMode === "CSS1Compat")?
        el.clientHeight:
        el.clientHeight;
    }

    

    componentWillUnmount() {
        let el = this.middleListWrapperEl;
        el.onscroll = ''
    }

    // middle 输入搜索内容
    searchData(value, data) {
        let { 
            name, idcard, mobilePhone, companyName, 
            yearlyTurnoverSymbol, yearlyTurnover, 
            propertySymbol, property, liabilitiesSymbol,
            liabilities, demandAmountSymbol, demandAmount,
            orgNo, orgName, cabinetNo, customerType, industryClass,
            existingBusinessType, existingBusinessAmountSymbol,
            existingBusinessAmount
        } = this.state
        if(value === 1) {
            name = this.cusName.input.value
        }else if(value === 2) {
            idcard = this.cusIdCard.input.value
        }else if(value === 3) {
            mobilePhone = this.cusPhone.input.value
        }else if(value === 4) {
            companyName = this.cusCompany.input.value
        }else if(value === 5) {
            yearlyTurnoverSymbol = data
        }else if(value === 6) {
            yearlyTurnover = this.yearlyTurnoverEl.input.value
        }else if(value === 7) {
            propertySymbol = data
        }else if(value === 8) {
            property = this.propertyEl.input.value
        }else if(value === 9) {
            liabilitiesSymbol = data
        }else if(value === 10) {
            liabilities = this.liabilitiesEl.input.value
        }else if(value === 11) {
            demandAmountSymbol = data
        }else if(value === 12) {
            demandAmount = this.demandAmountEl.input.value
        }
        else if(value === 13) {
            orgNo = this.organizeNo.input.value
        }else if(value === 14) {
            orgName = this.organizeName.input.value
        }else if(value === 15) {
            cabinetNo = this.tellerNo.input.value
        }else if(value === 16) {
            customerType = data
        }else if(value === 17) {
            industryClass = data
        }else if(value === 18) {
            existingBusinessType = data
        }else if(value === 19) {
            existingBusinessAmountSymbol = data
        }else if(value === 20) {
            existingBusinessAmount = this.existAmountEl.input.value
        }

        this.setState({
            name,
            idcard,
            mobilePhone,
            companyName,
            yearlyTurnoverSymbol,
            yearlyTurnover,
            propertySymbol,
            property,
            liabilitiesSymbol,
            liabilities,
            demandAmountSymbol,
            demandAmount,
            orgNo,
            orgName,
            cabinetNo,
            customerType,
            industryClass,
            existingBusinessType,
            existingBusinessAmountSymbol,
            existingBusinessAmount
        })
    }

    // 年营业额
    handleyearlyTurnoverEl(value) {
        // console.log(value)
        this.setState({
            yearlyTurnoverSymbol:value
        })
    }

    // 资产情况
    handlepropertyEl(value) {
        this.setState({
            propertySymbol:value
        })
    }


    // 负债情况
    handleliabilitiesEl(value) {
        this.setState({
            liabilitiesSymbol:value
        })
    }

    // 需求金额
    handledemandAmountEl(value) {
        this.setState({
            demandAmountSymbol:value
        })
    }

    // 已发生业务金额
    existingBusinessAmountEl(value) {
        this.setState({
            existingBusinessAmount:value
        })
    }

    // 审核状态
    handledemandStatus(value) {
        this.setState({
            status:value
        })
    }

    // 转义
    unhtml(str) {
        return str ? str.replace(/[<">']/g, (a) => {
            return {
                '<': '&lt;',
                '>': '&gt;',
            }[a]
        }) : '';
    }

    // 搜索取消
    handleCancelSearch() {
        this.setState({
            visible: false,
        });
    }

    handleCancelSearchNew(cusName, cusCompanyName, cusTelName) {
        this.setState({
            visibleNew: false,
        });
    }

    // 搜索查询数据
    handleSaveSearch() {
        this.setState({
            load:true,
            pageNum:1,
            visible:false
        }, () => {
            this.getListData()
        })

    }

    handleSaveSearchNew() {
        this.setState({
            load:true,
            pageNum:1,
            visibleNew:false
        }, () => {
            this.getListData()
        })
    }

    // 获取list
    getListData(condition) {
        this.props.handleChangeStatus(false)
        this.props.handleChangeTrans(false)
        if(this.state.load) {
            let data = this.state.user;
            let { name, mobilePhone, companyName, yearlyTurnoverSymbol, yearlyTurnover, propertySymbol, property, liabilitiesSymbol, liabilities, demandAmountSymbol, 
                demandAmount, pageNum, pageSize, status, idcard,
                orgNo, orgName, cabinetNo, customerType, industryClass, existingBusinessType, existingBusinessAmountSymbol,
                existingBusinessAmount
            } = this.state;
            let urlType = data.userType
            
            let params = {}
            if(urlType == 2) {
                // 客户经理
                params = {
                    name:name,
                    idcard,
                    mobilePhone:mobilePhone,
                    companyName:companyName,
                    yearlyTurnoverSymbol:yearlyTurnoverSymbol,
                    yearlyTurnover:yearlyTurnover,
                    propertySymbol:propertySymbol,
                    property:property,
                    liabilitiesSymbol:liabilitiesSymbol,
                    liabilities:liabilities,
                    demandAmountSymbol:demandAmountSymbol,
                    demandAmount:demandAmount,
                    // 新增查询条件
                    pageNum:pageNum,
                    pageSize:pageSize,
                    status:status,
                    orgNo,
                    orgName,
                    cabinetNo,
                    customerType,
                    industryClass,
                    existingBusinessType,
                    existingBusinessAmountSymbol,
                    existingBusinessAmount
                }
            }else if(urlType == 3) {
                // 审核员
                params = {
                    name:name,
                    idcard,
                    mobilePhone:mobilePhone,
                    companyName:companyName,
                    pageNum:pageNum,
                    pageSize:pageSize
                    
                }
            }else if(urlType == 4) {
                // 业务管理员
                params = {
                    name:name,
                    idcard,
                    mobilePhone:mobilePhone,
                    companyName:companyName,
                    yearlyTurnoverSymbol:yearlyTurnoverSymbol,
                    yearlyTurnover:yearlyTurnover,
                    propertySymbol:propertySymbol,
                    property:property,
                    liabilitiesSymbol:liabilitiesSymbol,
                    liabilities:liabilities,
                    demandAmountSymbol:demandAmountSymbol,
                    demandAmount:demandAmount,
                    pageNum:pageNum,
                    pageSize:pageSize,
                    orgNo,
                    orgName,
                    cabinetNo,
                    customerType,
                    industryClass,
                    existingBusinessType,
                    existingBusinessAmountSymbol,
                    existingBusinessAmount
                }
            }
            this.setState({
                load:false
            }, () => {
                getCustomerList(params, urlType).then((res) => {
                    let data = res.data;
                    
                    if(data.code === 1 && data.msg === 'success') {
                        this.setState({
                            search:false
                        })
                        
                        // 调整逻辑，搜索列表时 详情关闭
                        this.props.disShowDetail(false)

                        if(data.data && data.data.list) {
                            data.data.list.map((item, index) => (
                                item.active = false
                            ))
                            
                            let newhomeList = this.props.homeList
                            // 滚动加载的数据
                            if(condition === 'concatList') {
                                this.props.disCusList(newhomeList.concat(data.data.list))
                            }else{
                                this.props.disCusList(data.data.list)
                            }
                            
                            
                            if(data.data.hasNextPage) {
                                this.setState({
                                    load:true,
                                    pageNum:data.data.pageNum + 1,
                                    total:data.data.total
                                })
                            }else {
                                this.setState({
                                    load:false,
                                    total:data.data.total
                                })
                            }
                        }else{
                            this.props.disCusList([])
                            this.setState({
                                total:0
                            })
                        }
                    }else{
                        message.error(data.msg);
                        
                        // 调整逻辑，搜索列表时 详情关闭
                        this.props.disShowDetail(false)
                    }
                })
            })
            

        }
    }

    
    // 导出客户
    exportCus(type) {
        let { name, mobilePhone, companyName, yearlyTurnoverSymbol, yearlyTurnover, propertySymbol, property, liabilitiesSymbol, liabilities, demandAmountSymbol, 
            demandAmount, pageNum, pageSize, status, idcard,
            orgNo, orgName, cabinetNo, customerType, industryClass, existingBusinessType, existingBusinessAmountSymbol,
            existingBusinessAmount
        } = this.state;
        let params = {}
        params = {
            name:name,
            idcard,
            mobilePhone:mobilePhone,
            companyName:companyName,
            yearlyTurnoverSymbol:yearlyTurnoverSymbol,
            yearlyTurnover:yearlyTurnover,
            propertySymbol:propertySymbol,
            property:property,
            liabilitiesSymbol:liabilitiesSymbol,
            liabilities:liabilities,
            demandAmountSymbol:demandAmountSymbol,
            demandAmount:demandAmount,
            // 新增查询条件
            pageNum:pageNum,
            pageSize:pageSize,
            orgNo,
            orgName,
            cabinetNo,
            customerType,
            industryClass,
            existingBusinessType,
            existingBusinessAmountSymbol,
            existingBusinessAmount
        }
        if(type && type === 'khjl') {
            params.status = status
            handleExport(params).then(res => {
                let data = res.data;
                let fileName = res.headers['content-disposition'].split(";")[1].split("filename=")[1];
                this.loadFile(fileName, res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }else {
            handleAllExport(params).then(res => {
                let data = res.data;
                let fileName = res.headers['content-disposition'].split(";")[1].split("filename=")[1];
                this.loadFile(fileName, res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    loadFile(fileName, content){
        var aLink = document.createElement('a');
        var blob = new Blob([content], {
            type: 'application/excel'
        });
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
        URL.revokeObjectURL(blob);
    }

    // 添加客户
    addCustomer(isAdd) {
        this.setState({
            isAdd:!this.state.isAdd,
            search:false,
            visible: false
        })
        
    }

     // 点击搜索
    handleSearchCustomer() {
        this.setState({
            isAdd:false,
            visible:true
        })
    }

    handleSearchCustomerNew() {
        this.setState({
            // search:!this.state.search,
            isAdd:false,
            visibleNew:true
        })
    }

     // 点击编辑
    handleEditCustomer(edit, homeList, editWrapperEl, middleListWrapperEl) {
        
        this.setState({
            edit:!this.state.edit,
            isAdd:false,
            search:false,
            visible: false
        }, () => {
            if(!this.state.edit) {
                homeList.map((item, index) => (
                    item.active = false
                ))
                this.props.disCusList(homeList)
                editWrapperEl.classList.remove('editWrapper-active')
                middleListWrapperEl.classList.remove('middleListWrapper-active')
            }else{
                this.props.disCusList(homeList)
                editWrapperEl.classList.add('editWrapper-active')
                middleListWrapperEl.classList.add('middleListWrapper-active')
            }
        })


        
        
    }

    // 点击列表
    handleList(homeList, item, index, customerId, active, edit) {
        let params = {
            isAdd:false
        }
        this.props.isAddAction(params)
        this.props.handleCusEdit(false)
        // console.log(edit)
        if(!edit) {
            // if(active) {
            //     return 
            // }else{
                for(let i = 0; i < homeList.length; i ++) {
                    homeList[i].active = false
                }
                homeList[index].active = true;
                this.props.disShowDetail(true)
                this.props.disSpin(true)
                
                this.props.disCusList(homeList)
                let params = {
                    id:customerId
                }
                getCustomerDetail(params).then((res) => {
                    let data = res.data
                    if(data.code === 1 && data.msg === 'success') {
                        if(data.data) {
                            // console.log(data)
                            this.props.disCusDetail(data.data)
                            this.props.disSpin(false)
                        }else{
                            message.error('暂无数据')
                        }
                    }else{
                        message.error(data.msg)
                    }
                })
                
            // }
        }else {
            homeList[index].active = !homeList[index].active
            this.props.disCusList(homeList)
            let arr = []
            homeList.map((item, index) => (
                item.active?arr.push(item.customerId):""
            ))
            if(arr.length) {
                this.props.disShowDetail(true)  
            }else{
                this.props.disShowDetail(false) 
            }

            let params = {}
            if(active) {
                if(arr.length) {
                    params = {
                        id:arr[arr.length - 1]
                    }
                }else {
                    return
                }
                
            }else {
                params = {
                    id:customerId
                }
            }
            this.props.disSpin(true)
            this.props.disShowDetail(true)
            getCustomerDetail(params).then((res) => {
                let data = res.data
                if(data.code === 1 && data.msg === 'success') {
                    if(data.data) {
                        // console.log(data)
                        this.props.disCusDetail(data.data)
                        this.props.disSpin(false)
                    }else{
                        message.error('暂无数据')
                    }
                }else{
                    message.error(data.msg)
                }
            })
            
        }


        // 派发空数组
        this.props.dishandlenone(true)
    }

    // 维护
    handleStick(item) {
        this.props.handleChangeStick(true, item)
    }

    // 列表删除
    handledelete(confirm, homeList) {
        let deleArr = [];
        let that = this;
        homeList.map((item, index) => (
            item.active?deleArr.push(item.customerId):""
        ))
        let params = {
            customerIds:deleArr.join(',')
        }
        if(!deleArr.length) {
            message.info('请先选择客户')
            return
        }
        confirm({
            title: '确认删除?',
            okText:"确定",
            cancelText:"取消",
            onOk() {
                handlecustomDelete(params).then((res) => {
                    let data = res.data
                    if(data.code === 1 && data.msg === 'success') {
                        message.success('删除成功')
                        that.setState({
                            load:true,
                            pageNum:1,
                            pageSize:10,
                            name:'',
                            companyName:'',               // 公司名称
                            yearlyTurnoverSymbol:'',      // 年营业额符号（><=）
                            yearlyTurnover:'',           // 年营业额（万元）   
                            propertySymbol:'',          // 资产情况符号（><=）
                            property:'',                // 资产情况（万元）
                            liabilitiesSymbol:'',       // 负债情况符号（><=）
                            liabilities:'',             // 负债情况（万元）
                            demandAmountSymbol:'',      // 需求金额符号（><=）
                            demandAmount:''            // 需求金额（万元）
                        }, () => {
                            that.props.disShowDetail(false)
                            that.getListData()
                        })
                    }else{
                        message.error(data.msg)
                    }
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }

     // 点击新建用户
     handleAdd(isAddAction, homeList) {
        homeList.map((item, index) => (
            item.active = false
        ))
        this.props.disCusList(homeList)
        
        this.setState({
            customerId:"",
            isAdd:false
        },() => {
            let params = {
                isAdd:true
            }
            isAddAction(params)
            let obj = {}
            this.props.disShowDetail(false)
            this.props.handleCusEdit(false)
            this.props.disCusDetail(obj)
        })
    }


    // 要移交的客户经理列表handle
    handleTransfer(item, totransfer) {
        
        let newtotransfer = totransfer
        newtotransfer.map((item) => (
            item.active = false
        ))
        item.active = true
        this.setState({
            totransfer:newtotransfer
        }, () => {
            // console.log(this.state.totransfer)
        })
    }

    // 点击移交
    handleToTransfer(transferWrapEl, homeList) {
        let data = []
        homeList.map((item, index) => (
            item.active === true?data.push(item):''
        ))
        
        toTransfer().then((res) => {
            let data = res.data
            console.log(data)
            if(data.data) {
                data.data.map((item, index) => (
                    item.active = false
                ))
                this.setState({
                    totransfer:data.data
                })
            }else {
                message.error(data.msg)
            }
        })
        if(data.length) {
            transferWrapEl.classList.add('active')
        }else{
            message.info('请先选择要移交的客户')
        }
        
    }

    // 隐藏移交列表
    hideTotransfer(transferWrapEl) {
        transferWrapEl.classList.remove('active')
    }


    // 确认移交
    sureTransfer(totransfer, homeList, transferWrapEl) {
        let customerIds = []
        let newUserId = ''
        homeList.map((item) => {
            return (
                item.active?customerIds.push(item.customerId):""
            )
        })
        totransfer.map((item) => {
            return (
                item.active?newUserId = item.userId:""
            )
        })

        let params = {
            customerIds:customerIds.join(','),
            newUserId:newUserId
        }
        if(!newUserId) {
            message.info('请选择一个客户经理')
            return
        }
        const confirm = Modal.confirm;
        confirm({
            title:"确认移交",
            content:"将把当前客户经理下所有的客户资料进行移交，是否继续？",
            cancelText:"取消",
            okText:"确定",
            onOk() {
                sureToTransfer(params).then((res) => {
                    let data = res.data;
                    // console.log(data)
                    if(data.code === 1 && data.msg === 'success') {
                        message.success('移交成功')
                        this.setState({
                            load:true,
                            pageNum:1,
                            name:'',
                            companyName:'',               // 公司名称
                            yearlyTurnoverSymbol:'',      // 年营业额符号（><=）
                            yearlyTurnover:'',           // 年营业额（万元）   
                            propertySymbol:'',          // 资产情况符号（><=）
                            property:'',                // 资产情况（万元）
                            liabilitiesSymbol:'',       // 负债情况符号（><=）
                            liabilities:'',             // 负债情况（万元）
                            demandAmountSymbol:'',      // 需求金额符号（><=）
                            demandAmount:''            // 需求金额（万元）
                        }, () => {
                            this.getListData()
                            let params = {
                                isAdd:false
                            }
                            this.props.isAddAction(params)
                            this.props.disShowDetail(false)
                        })
                        transferWrapEl.classList.remove('active')
                    }else{
                        message.error(data.msg)
                    }
                })
            }
        })
        
    }

  
}


const mapDispatch = (dispatch) => ({
    // 改变客户列表数据
    disCusList(data) {
        // debugger
        let action = actionCreators.getMiddleList(data)
        dispatch(action)


    },


    // 重新计算高度
    resetHeight() {
        let screen_height = document.body.clientHeight;
        let el = document.getElementsByClassName('editSrollBar')[0]
        el.style.height = (screen_height - 60) + 'px';
    },

    // 点击新建客户派发action
    isAddAction(params) {
        let action = actionCreators.changeIsAdd(params)
        dispatch(action)
    },


    // 派发客户详情action
    disCusDetail(data) {
        let action = actionCreators.changeCusDetail(data)
        dispatch(action)
    },

    // 派发展示客户详情状态
    disShowDetail(bool) {
        let action = actionCreators.changeShowDetail(bool)
        dispatch(action)
    },

    // 派发加载中
    disSpin(bool) {
        let action = actionCreators.changeSpin(bool)
        dispatch(action)
    },

    //  改变新增客户后的状态
    handleChangeStatus(bool) {
        let action = actionCreators.changeAddStatus(bool)
        dispatch(action)
    },


    // 编辑客户
    handleCusEdit(bool) {
        let action = actionCreators.changeCusEdit(bool)
        dispatch(action)
    },

    dishandlenone(bool) {
        let action = actionCreators.changenofileList(bool)
        dispatch(action)
    },

    //  改变移交后的状态
    handleChangeTrans(bool) {
        let action = actionCreators.changeTransStatus(bool)
        dispatch(action)
    },

    // 维护
    handleChangeStick(bool, item) {
        let action = actionCreators.changeStick(bool, item)
        dispatch(action)
    }
   
   
})

const mapState = (state) => ({
    isAdd:state.getIn(['left', 'isAdd']),
    isEdit:state.getIn(['left', 'isEdit']),
    homeList:state.getIn(['left', 'homeList']),
    changeAddStatus:state.getIn(['left', 'changeAddStatus']),
    trans:state.getIn(['left', 'trans'])
})

export default connect(mapState, mapDispatch)(MiddleWrapper)