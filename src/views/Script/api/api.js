import request from '@/utils/request'

// 获取脚本模版列表
export function getScriptList(data) {
  return request({
    url: `/dispatch/script/job/template/selectPage`,
    method: 'post',
    data: data
  })
}
// 更新模版的上下线状态
export function updateStatus(data) {
  return request({
    url: `/dispatch/script/job/template/changeStatus`,
    method: 'post',
    params: data
  })
}
// 新增任务模版
export function addTaskTemplate(data) {
  return request({
    url: `/dispatch/script/job/template/add`,
    method: 'post',
    data: data
  })
}
// 更新任务模版
export function editTaskTemplate(data) {
  return request({
    url: `/dispatch/script/job/template/update`,
    method: 'post',
    data: data
  })
}

// 删除任务模版
export function delTask(data) {
  return request({
    url: `/dispatch/script/job/template/delete`,
    method: 'post',
    params: data
  })
}

// 新增流程模版
export function addFlowTask(data) {
  return request({
    url: `/dispatch/script/job/template/flow/add`,
    method: 'post',
    data: data
  })
}

// 获取流程信息
export function getFlowData(data) {
  return request({
    url: `/dispatch/script/job/template/flow/selectOne`,
    method: 'post',
    params: data
  })
}
// 更新流程信息
export function updateFlowData(data) {
  return request({
    url: `/dispatch/script/job/template/flow/update`,
    method: 'post',
    data: data
  })
}
