import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import LeftCon from '../home/common/LeftWrapper'
import { Tooltip, Empty, Drawer, Input, Select, message, Upload, Modal } from 'antd'
import InfiniteScroll from 'react-infinite-scroller';

import { getPublicList, getCustomerDetail, PICTURE_EXPRESSION,  handleTurn } from '../../api'

import {  
    ConWrapper,
    Customer,
    MiddleHeader,
    OperateWrapper,
    MiddleListWrapper,
    MiddleList,
    MiddleChceckBox,
    CustomerInfo,

    // 搜索
    SearchCondition,
    SearchMoreCodition,
    AddButtonWrapper,
    AddCusButton,

    // 右边详情
    DetailWrapper,
    RightWrapper,
    RightContentWrapper,
    FileWrapper,
    FileItem
} from '../home/style'

import { EditWrapper, EditItem } from '../../common/style'

class PublicCustomer extends Component {
    constructor(props) {
        super()
        this.state = {
            login:false,
            data:[],
            selectAll:false,
            visible: false,
            loading: false,
            hasMore: true,
            previewVisible:false,
            previewImage: '',
            fileList:[],
            attachFile:[],
            selectAll:false,

            name:'',                // 搜索 姓名
            idcard:'',              // 身份证
            mobilePhone:'',         // 手机号
            companyName:'',         // 公司名称
            yearlyTurnoverSymbol:'',// 年营业额符号（><=）
            yearlyTurnover:'',      // 年营业额（万元）
            propertySymbol:'',      // 资产情况符号（><=）
            property:'',            // 资产情况（万元）
            liabilitiesSymbol:'',   // 负债情况符号（><=）
            liabilities:'',         // 负债情况（万元）
            demandAmountSymbol:'',  // 需求金额符号（><=）
            demandAmount:'',        // 需求金额（万元）
            pageNum:1,
            pageSize:10,
            hasNextPage:false,
            customerDetail:{}       // 客户详情
        }
    }

    onClose = () => {
        this.setState({
          visible: false,
        });
    };


    render() {
        const { data, selectAll, name, idcard, mobilePhone, companyName, customerDetail, fileList, previewVisible, previewImage, attachFile } = this.state
        const Option = Select.Option;
        return (
            <ConWrapper>
                <LeftCon />
                <Customer className="customer">
                    <MiddleHeader>
                        <Fragment>
                            <span>公共客户</span>
                            <OperateWrapper>
                                <Fragment>
                                    <Tooltip title="查询" onClick={() => {this.handleSearch()}}>
                                        <div className="reset-sousuo"></div>
                                    </Tooltip>
                                    <Tooltip title="管理" onClick={() => {this.handleSupervise()}}>
                                        <div className="reset-bianji"></div>
                                    </Tooltip>
                                </Fragment>
                            </OperateWrapper>
                        </Fragment>
                    </MiddleHeader>

                    <MiddleListWrapper className='editSrollBar stickSroll publicSroll'
                        
                    >
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
                            hasMore={!this.state.loading && this.state.hasMore}
                            useWindow={false}
                            className='scroll-box'
                            >

                            {   
                                data && data.length?
                                data.map((item, index) => (
                                    <MiddleList 
                                        className={item.active?"selected list pub-list":" list pub-list"}
                                        key={item.customerId}>
                                        <div className={selectAll && item.active?'iconfont same-active same-active2 click-active same-active3 reset-select':'iconfont same-active same-active2 reset-select'}></div>
                                        <MiddleChceckBox className={selectAll?'same-active same-active1 click-active':'same-active same-active1'}></MiddleChceckBox>
                                        
                                        {
                                            item.photo?<img src={item.photo} alt="" />
                                            :
                                            <div className="moren-img"></div>
                                        }
                                        <CustomerInfo onClick={() => {this.handleList(item)}}>
                                            <p>
                                                <span>{item.name}</span>
                                                <span>{item.mobilePhone}</span>
                                            </p>
                                            <p>
                                                {item.companyName || '暂无公司信息'}
                                            </p>
                                        </CustomerInfo>
                                        
                                    </MiddleList>
                                ))
                                :<Empty className='' description={'暂无数据'} />
                            }
                        </InfiniteScroll>
                    
                        {/* 搜索条件 S */}
                        <Drawer
                            placement="top"
                            closable={false}
                            destroyOnClose={true}
                            visible={this.state.visible}
                            getContainer={'.publicSroll'}
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

                            <SearchMoreCodition className="public-condition">
                                <div className="condition-select">
                                    <p>年营业额</p>
                                    <Select
                                        style={{ width: '55%' }}
                                        placeholder="请选择"
                                        ref={i => this.symbol1 = i}
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
                            
                            <AddButtonWrapper>
                                <AddCusButton className="add-cancel" onClick={() => this.handleCancel()}
                                >取消</AddCusButton>
                                <AddCusButton className="add-save" onClick={() => this.handleComfire()}
                                >查询</AddCusButton>
                            </AddButtonWrapper>
                        </Drawer>
                        {/* 搜索条件 E */}
                    </MiddleListWrapper>
                
                    <EditWrapper ref={e => this.supervise = e} className="public-edit">
                        <EditItem>
                            <Tooltip title="认领" onClick={() => {this.handleTurn()}}>
                                <div className="reset-yijiao"></div>
                            </Tooltip>
                            <span>认领</span>
                        </EditItem>
                    </EditWrapper>
                </Customer>

                <DetailWrapper>
                    <div className="newheight">
                        <RightWrapper>
                            <RightContentWrapper className={customerDetail.customerId?"isShow":"isHide" }>
                                <tbody>
                                    <tr>
                                        <td>客户姓名</td>
                                        <td>{(customerDetail && customerDetail.name) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>身份证号码</td>
                                        <td>{(customerDetail && customerDetail.idcard) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>手机号码</td>
                                        <td>{(customerDetail && customerDetail.mobilePhone) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>常住地址</td>
                                        <td>{(customerDetail && customerDetail.address) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>客户号</td>
                                        <td>{(customerDetail && customerDetail.customerNo) || <span className="no-data">暂无</span>}</td>
                                    </tr>

                                    {/* 新增客户类型 S */}
                                    <tr>
                                        <td>客户类型</td>
                                        <td>{(customerDetail && customerDetail.customerType) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    {/* 新增客户类型 E */}

                                    <tr>
                                        <td>行业分类</td>
                                        <td>{(customerDetail && customerDetail.industryClass) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>公司(店铺)名称</td>
                                        <td>{(customerDetail && customerDetail.companyName) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>经营内容</td>
                                        <td>{(customerDetail && customerDetail.businessContent) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>经营地址</td>
                                        <td>{(customerDetail && customerDetail.businessAddress) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>工作人员数量</td>
                                        <td>{(customerDetail && customerDetail.staffNum) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    
                                    {/* {console.log(customerDetail)} */}
                                    {/* 新增 */}
                                    <tr>
                                        <td>生产经营面积</td>
                                        <td>{(customerDetail && customerDetail.businessArea) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>年营业额(近三年平均)</td>
                                        <td>{(customerDetail && customerDetail.yearlyTurnover) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>资产情况(万元)</td>
                                        <td>{(customerDetail && customerDetail.property) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>负债情况(万元)</td>
                                        <td>{(customerDetail && customerDetail.liabilities) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>信用情况(人品、口碑)</td>
                                        <td>{(customerDetail && customerDetail.creditInfo) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>有无融资需求</td>
                                        <td>{(customerDetail && customerDetail.financialDemand == 1?'有':'无')}</td>
                                    </tr>
                                    <tr>
                                        <td>需求金额(万元)</td>
                                        <td>{(customerDetail && customerDetail.demandAmount) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>已与我行发生业务种类</td>
                                        <td>{(customerDetail && customerDetail.existingBusinessType) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>已发生业务金额</td>
                                        <td>{(customerDetail && customerDetail.existingBusinessAmount) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>是否有经营合伙人</td>
                                        <td>{(customerDetail && customerDetail.isBusinessPartner === 0?'无':'有')}</td>
                                    </tr>
                                    <tr>
                                        <td>关联人姓名</td>
                                        <td>{(customerDetail && customerDetail.relatName) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>关联人身份证号码</td>
                                        <td>{(customerDetail && customerDetail.relatIdcard) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>关联人关系</td>
                                        <td>{(customerDetail && customerDetail.relatRelationship) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>关联人联系电话</td>
                                        <td>{(customerDetail && customerDetail.relatPhone) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>关联人备注</td>
                                        <td>{(customerDetail && customerDetail.relatRemark) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    {
                                        customerDetail && customerDetail.applyTime?
                                        <tr>
                                            <td>认领时间</td>
                                            <td>{(customerDetail && customerDetail.applyTime) || <span className="no-data">暂无</span>}</td>
                                        </tr>
                                        :
                                        <tr>
                                            <td>首次保存时间</td>
                                            <td>{(customerDetail && customerDetail.createTime) || <span className="no-data">暂无</span>}</td>
                                        </tr>
                                    }
                                </tbody>
                            </RightContentWrapper>
                            {
                                customerDetail.attachs && customerDetail.attachs.length?
                                
                                <Fragment>
                                    
                                    <div className="list-photo">
                                        <Upload 
                                            
                                            accept=".jpg, .jpeg, .png, svg, gif, .bmp"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={(file) => {this.handlePreview(file)}}
                                            >
                                            {fileList.length >= 9 ? null : ''}
                                        </Upload>

                                        <Modal visible={previewVisible} footer={null} onCancel={(file) => {this.handlePreviewCancel(file)}}>
                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                        </Modal>
                                        <p className="clear"></p>
                                    </div>
                                </Fragment>
                                :""
                            }

                            <FileWrapper>
                                {
                                    attachFile && attachFile.length? 
                                    attachFile.map((item, index) => (
                                        <FileItem key={item}
                                            onClick={() => {this.handleAttachDownload(item, attachFile)}}
                                        >
                                            <span className="iconfont">&#xe600;</span>
                                            {item.name}
                                        </FileItem>
                                    ))
                                    :''
                                }
                            </FileWrapper>
                            <Empty className={!customerDetail.customerId?"isShow":"isHide" } description={'暂无数据'} />
                        </RightWrapper>
                    </div>
                </DetailWrapper>
            </ConWrapper>
        )
    }

    componentDidMount() {
        this.getData('didMount')
    }

    handleInfiniteOnLoad = () => {
        const { hasNextPage } = this.state
        this.setState({
            loading: true,
        });
        
        if(hasNextPage) {
            let pageNum = this.state.pageNum
                pageNum++
            this.setState({
                pageNum
            }, () => {
                this.getData('search')
            })
        }
        
    }

    getData(type) {
        let params = {}
        const {
            name, idcard, mobilePhone, companyName, 
            yearlyTurnoverSymbol, yearlyTurnover, 
            propertySymbol, property, liabilitiesSymbol,
            liabilities, demandAmountSymbol, demandAmount,
            pageNum, pageSize
        } = this.state
        params = {
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
            pageNum,
            pageSize
        }
        getPublicList(params).then(res => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                if(data.data && data.data.list) {
                    if(type === 'didMount') {
                        this.setState({
                            data:data.data.list,
                            hasNextPage:data.data.hasNextPage,
                            loading:false
                        })
                    }else if(type === 'search') {
                        let oldData = this.state.data
                        this.setState({
                            data:oldData.concat(data.data.list),
                            hasNextPage:data.data.hasNextPage,
                            loading:false
                        })
                    }
                }else{
                    this.setState({
                        data:[],
                        loading:false
                    })
                }
                
                
            }else{
                // message.error(data.msg)
            }

            
        })
        .catch(err => {
            console.log(err)
        })
    }

    // middle 搜索
    handleSearch() {
        this.setState({
            visible: true,
        });
    }

    // middle 输入搜索内容
    searchData(value, data) {
        let { 
            name, idcard, mobilePhone, companyName, 
            yearlyTurnoverSymbol, yearlyTurnover, 
            propertySymbol, property, liabilitiesSymbol,
            liabilities, demandAmountSymbol, demandAmount
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
            demandAmount
        })
    }

    // middle 取消搜索
    handleCancel() {
        this.setState({
            visible: false,
        });
    }    

    // middle 搜索
    handleComfire() {
        this.setState({
            pageNum:1,
            visible:false
        }, () => {
            this.getData('didMount')
        })
    }


    // middle 点击列表
    handleList(item) {
        let { data, selectAll } = this.state
        if(!selectAll) {
            for(let i = 0; i < data.length; i ++) {
                data[i].active = false
            }
            item.active = true
        }else{
            item.active = !item.active
        }

        this.setState({
            data
        })

        let params = {
            id:item.customerId
        }

        if(selectAll) {
            return
        }
        getCustomerDetail(params).then(res => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                let customerDetail = data.data
                let fileList = []
                let attachFile = []
                let temporaryFiles = []

                if(customerDetail.attachs && customerDetail.attachs.length) {
                    for(let i = 0; i < customerDetail.attachs.length; i ++) {
                        let obj = {}
                        obj.uid = customerDetail.attachs[i].attachId
                        obj.name = customerDetail.attachs[i].origName
                        obj.status = 'done'
                        obj.attachSuffix = customerDetail.attachs[i].attachSuffix
                        obj.url = customerDetail.attachHost + customerDetail.attachs[i].attachPath
                        temporaryFiles.push(obj)
                    }
                    
                    for(let i = 0; i < temporaryFiles.length; i ++) {
                        if(PICTURE_EXPRESSION.test(temporaryFiles[i].attachSuffix)) {
                            fileList.push(temporaryFiles[i])
                        }else {
                            attachFile.push(temporaryFiles[i])
                        }
                    }
                    
                }

                this.setState({
                    customerDetail,
                    fileList,
                    attachFile
                })
                
            }else {
                message.error(data.msg)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }


    // right 预览图片
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    // right 预览关闭
    handlePreviewCancel = (file) => {
        this.setState({ previewVisible: false })
    }

    // middle 管理
    handleSupervise = () => {
        let selectAll = !this.state.selectAll
        if(selectAll) {
            this.supervise.classList.add('editWrapper-active')
        }else{
            this.supervise.classList.remove('editWrapper-active')
        }
        
        this.setState({
            selectAll
        })
    }


    // middle 认领
    handleTurn() {
        let { data } = this.state
        let trackIds = []
        for(let i = 0; i < data.length; i ++) {
            if(data[i].active) {
                trackIds.push(data[i].trackId)
            }
        }

        let params = {
            trackIds:trackIds.join(',')
        }

        handleTurn(params).then(res => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('认领成功')
                this.setState({
                    pageNum:1
                }, () => {
                    this.getData('didMount')
                })
            }else{
                message.error(data.msg)
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }
}

const mapDispatch = (dispatch) => ({

})

const mapState = (state) => ({
    
})

export default connect()(PublicCustomer)
