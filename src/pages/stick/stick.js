import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tooltip, InputNumber, message, Empty, Input, Select, Upload, Icon, Modal  } from 'antd'
import { 
    getStickList, getsystemData, stickUploadUrl, 
    handleUpload, removeStickImg, newlyRecord, 
    getNewlyRecordList, getRecordDetail, removeRecord
} from '../../api'

import InfiniteScroll from 'react-infinite-scroller';


import { 
    Customer,
    OperateWrapper,
    MiddleHeader,
    MiddleListWrapper,
    MiddleList,
    MiddleChceckBox,
    CustomerInfo,

    // 右边部分
    DetailWrapper,
    

 } from '../home/style'

 import {
    AddWrapper,
    AddCusHeadWrapper,
    AddCusHeadText,
    AddButtonWrapper,
    AddCusButton,
    AddContent,
    AddItem,
    AddTitle,
    AddUpload,
    AddUploadWrapper,
    EditWrapper,
    EditItem
 } from '../../common/style'

class StickPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId:'',              // 客户ID
            data:[],
            loading: false,
            hasMore: true,
            
            systemData:{},
            isbeizhu:'',
            fileList: [],               // 图片
            stickDetail:{
                trackId:null,           // 记录id
                record:'',              // 维护记录
                businessVal:undefined,  // 业务种类
                vacancies:'',           // 余额
                remarks:''              // 备注
            },
            previewVisible: false,
            previewImage: '',
            editOrAdd:true,
            disabled:false,
            selectAll:false
        }
    }
    

    render() {
        let { data, selectAll, systemData, isbeizhu, fileList, stickDetail, previewVisible, previewImage, editOrAdd, disabled } = this.state
        let { id, name } = this.props
        const Option = Select.Option;
        const { TextArea } = Input;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );

        return (
            <Fragment>
                {/* 中间部分 */}
                <Customer className="customer">
                    <MiddleHeader>
                        <Fragment>
                            <span>维护记录</span>
                            <OperateWrapper>
                                <Fragment>
                                    <Tooltip title="新建客户" onClick={() => {this.addCustomer()}}>
                                        <div className="reset-jia"></div>
                                    </Tooltip>
                                    {/* <Tooltip title="搜索" onClick={() => {this.handleSearchCustomer()}}>
                                        <div className="reset-sousuo"></div>
                                    </Tooltip> */}
                                    <Tooltip title="管理" onClick={() => {this.handleSupervise()}}>
                                        <div className="reset-bianji"></div>
                                    </Tooltip>
                                </Fragment>
                            </OperateWrapper>
                        </Fragment>
                    </MiddleHeader>
                    
                    <MiddleListWrapper className='editSrollBar stickSroll'>
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
                                data && data.map((item, index) => (
                                    <MiddleList 
                                        className={item.active?"selected list":" list"}
                                        key={item.trackId}>
                                        <div className={selectAll && item.active?'iconfont same-active same-active2 click-active same-active3 reset-select':'iconfont same-active same-active2 reset-select'}></div>
                                        <MiddleChceckBox className={selectAll?'same-active same-active1 click-active':'same-active same-active1'}></MiddleChceckBox>
                                        
                                        {
                                            item.pic?<img src={item.pic} alt="" />
                                            :
                                            <div className="moren-img"></div>
                                        }
                                        <CustomerInfo onClick={() => {this.handleList(item)}}>
                                            <p>
                                                <span>{item.record}</span>
                                            </p>
                                            <p>
                                                <span>{(item.createTime).substring(0, 10)}</span>
                                                <span className="balance-left">余额: {item.balance}</span>
                                            </p>
                                        </CustomerInfo>
                                        
                                    </MiddleList>
                                ))
                                :<Empty className='' description={'暂无数据'} />
                            }
                        </InfiniteScroll>
                    </MiddleListWrapper>
                    <p className="belongs-cus">所属客户: {name}</p>

                    <EditWrapper ref={e => this.supervise = e}>
                        <EditItem>
                            <Tooltip title="删除" onClick={() => {this.handleRemove()}}>
                                <div className="reset-shanchu"></div>
                            </Tooltip>
                        </EditItem>
                    </EditWrapper>
                </Customer>

                {/* 右边部分 */}
                <DetailWrapper>
                    <AddWrapper>
                        {
                            editOrAdd?
                            <AddCusHeadWrapper>
                                <AddCusHeadText>新建记录</AddCusHeadText>
                                <AddButtonWrapper>
                                    <AddCusButton className="add-cancel" onClick={() => {this.handleAbolish()}}>
                                        取消
                                    </AddCusButton>
                                    <AddCusButton className="add-save" onClick={() => {this.handleSave()}}>
                                        保存
                                    </AddCusButton>
                                </AddButtonWrapper>
                            </AddCusHeadWrapper>
                            :""
                        }
                    </AddWrapper>

                    <AddContent>
                        {
                            editOrAdd?
                                <Fragment>
                                    <AddItem className='clear-fix'>
                                        <AddTitle><span>*</span>维护记录</AddTitle>
                                        <input
                                            className="add-input"
                                            placeholder="请输入"
                                            ref = {i => this.stickEl = i}
                                            value={stickDetail.record}
                                            onChange={() => {this.setValue()}}
                                            disabled={disabled}
                                        />
                                        <p></p>
                                    </AddItem>

                                    <AddItem className='clear-fix'>
                                        <AddTitle><span>*</span>业务种类</AddTitle>
                                        <Select
                                            style={{ width: '60%', marginBottom:0 }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            onChange={(value) => {this.customkindtype(value)}}
                                            value={stickDetail.businessVal}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            disabled={disabled}
                                        >
                                            {
                                                // 要做容错处理
                                                systemData.existingBusinessType && systemData.existingBusinessType.map((item, index) => {
                                                    return (
                                                        <Option key={item}>{item}</Option>
                                                    )
                                                    
                                                })
                                            }
                                            
                                        </Select>
                                        <p></p>
                                    </AddItem>

                                    <AddItem className='clear-fix'>
                                        <AddTitle><span>*</span>余额(元)</AddTitle>
                                        <InputNumber 
                                            className="add-input" 
                                            min={1} 
                                            value={stickDetail.vacancies} 
                                            ref = {i => this.stickVacanEl = i}
                                            onChange={() => {this.setValue()}} 
                                            placeholder="请输入"
                                            disabled={disabled}
                                            />
                                        <p></p>
                                    </AddItem>

                                    <AddItem className='clear-fix'>
                                        <AddTitle><span></span>备注</AddTitle>
                                        <TextArea rows={4} value={stickDetail.remarks} className="msg-textarea msg-textarea-2"
                                            ref={i => this.stickRemarksEl = i}
                                            onChange={() => {this.setValue()}}
                                            disabled={disabled}
                                        />
                                        <p></p>
                                    </AddItem>

                                    <AddUpload>
                                        <AddTitle><span></span>图片</AddTitle>
                                        <AddUploadWrapper>
                                            <div className="clearfix">
                                                <Upload
                                                    accept=".jpg, .jpeg, .png, .bmp, .gif"
                                                    listType="picture-card"
                                                    multiple={false}
                                                    customRequest={(file) => {this.customRequest(file)}}
                                                    fileList={fileList}
                                                    onPreview={(file) => {this.stickPreView(file)}}
                                                    onRemove={(file) => {this.stickRemove(file)}}
                                                    disabled={disabled}
                                                    >
                                                    {fileList.length >= 2 ? null : uploadButton}
                                                </Upload>

                                                <Modal visible={previewVisible} footer={null} onCancel={() => {this.handleCancel()}}>
                                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                </Modal>
                                            </div>
                                        </AddUploadWrapper>
                                    </AddUpload>
                                </Fragment>
                            :<Empty className='' description={'暂无数据'} />
                        }
                    </AddContent>
                </DetailWrapper>
            </Fragment>
        )
    }


    componentDidMount() {
        this.getSysData()
        
        this.setState({
            customerId:this.props.id
        }, () => {
            this.getData()
        })
    }

    // 获取维护记录列表
    getData() {
        let params = {
            customerId:this.state.customerId
        }
        getNewlyRecordList(params).then(res => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                if(data.data && data.data.list) {
                    this.setState({
                        data:data.data.list
                    })
                }else{
                    this.setState({
                        data:[]
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


    // 系统数据，如业务种类等
    getSysData() {
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

    handleInfiniteOnLoad() {
        console.log('loading')
        
    };

    // 业务种类
    customkindtype(value) {
        
        let stickDetail = this.state.stickDetail
        stickDetail.businessVal = value
        this.setState({
            stickDetail
        })
    };


    // 输入内容
    setValue() {
        let stickDetail = this.state.stickDetail
        stickDetail.record = this.stickEl.value
        stickDetail.vacancies = this.stickVacanEl.inputNumberRef.input.value
        stickDetail.remarks = this.stickRemarksEl.textAreaRef.value

        this.setState({
            stickDetail
        })

    };

    // middle 新建按钮
    addCustomer() {
        this.handleClearAll()
        this.setState({
            editOrAdd:true
        })
    }

    // middle 管理按钮
    handleSupervise() {
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

    // middle 删除按钮
    handleRemove() {
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

        removeRecord(params).then(res => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('删除成功')
                this.handleClearAll()
                this.getData()
            }else{
                message.error(data.msg)
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    // 取消
    handleAbolish() {
        this.setState({
            editOrAdd:false
        })
    }

    // 保存
    handleSave() {
        const { trackId, record, businessVal, vacancies, remarks } = this.state.stickDetail
        const { customerId } = this.state
        let { fileList } = this.state
        if(!record) {
            message.error('维护记录不能为空')
            return
        }else if(!businessVal) {
            message.error('业务种类不能为空')
            return
        }else if(!vacancies) {
            message.error('余额不能为空')
            return
        }

        

        let params = {
            trackId:trackId,
            customerId:customerId,
            record:record,
            bizType:businessVal,
            balance:vacancies,
            remark:remarks
        }

        let pics = []
        let val = ''
        for(let i = 0; i < fileList.length; i ++) {
            val = fileList[i].uid
            params['pics[' + i + '].picId'] = val
        }

        newlyRecord(params).then(res => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('新增成功')
                this.getData()
                this.handleClearAll()
            }else{
                message.error(data.msg)
            }
        })
        .catch((err) => {
            console.log(err)
            // message.error('网络故障')
        })

    };

    // 上传图片
    customRequest(option) {
        message.loading('上传中...', 0)

        const formData = new FormData()
        let fileUrl = stickUploadUrl
        let newFiles = []
        let obj = {}
        formData.append('file', option.file)

        handleUpload(fileUrl, formData).then(res => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.destroy();
                message.success('上传成功')
                let newFile = this.state.fileList
                obj.name = 'image.png'
                obj.status = 'done'
                obj.uid = data.data.list[0].picId
                obj.url = data.data.attachHost + data.data.list[0].picPath
                newFiles.push(obj)
                this.setState({
                    fileList: newFile.concat(newFiles)
                })
            }else{
                message.destroy();
                message.error('上传失败')
            }
        })
        .catch((err) => {
            message.destroy();
        })
    };

    // 图片预览
    stickPreView(file) {
        this.setState({
            previewImage: file.url,
            previewVisible: true
        });
    };

    // 图片删除
    stickRemove(file) {
        let params = {
            picId:file.uid
        }
        removeStickImg(params).then(res => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                let fileList = this.state.fileList
                for(let i = 0; i < fileList.length; i ++) {
                    if(fileList[i] === file) {
                        fileList.splice(i, 1)
                        this.setState({
                            fileList
                        })
                        message.success('删除成功')
                    }
                }
                
            }else {
                message.error(data.msg)
            }
        })
        .catch(err => {
            // message.error('网络故障')
        })
    }

    // 关闭预览
    handleCancel() {
        this.setState({ previewVisible: false })
    }

    // 清空数据
    handleClearAll() {
        let stickDetail = this.state.stickDetail
        stickDetail.trackId = null
        stickDetail.record = ''
        stickDetail.businessVal = undefined
        stickDetail.vacancies = ''
        stickDetail.remarks = ''

        this.setState({
            fileList:[],
            stickDetail
        })
    }

    // 点击维护列表
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
            id:item.trackId
        }

        if(selectAll) {
            return
        }
        
        getRecordDetail(params).then(res => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                let stickDetail = this.state.stickDetail
                let fileList = []
                stickDetail.trackId = data.data.trackId
                stickDetail.record = data.data.record
                stickDetail.businessVal = data.data.bizType
                stickDetail.vacancies = data.data.balance
                stickDetail.remarks = data.data.remark
                if(data.data.pics && data.data.pics.length) {
                    for(let i = 0; i < data.data.pics.length; i ++) {
                        let obj = {}
                        obj.name = 'image.png'
                        obj.status = 'done'
                        obj.uid = data.data.pics[i].picId
                        obj.url = data.data.picHost + data.data.pics[i].picPath
                        fileList.push(obj)
                    }
                }
                
                this.setState({
                    stickDetail,
                    fileList
                })
            }else {
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
    id:state.getIn(['left', 'id']),
    name:state.getIn(['left', 'name'])
})

export default connect(mapState, mapDispatch)(StickPage)