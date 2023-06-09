<template>
  <div class="h1">建立单位安全管理评估模型，评估安全管理现状，实施每月排名，鞭策后进。</div>
  <div class="h1-desc-box">
    <div class="h1-desc-before"></div>
    <div class="h1-desc">制定模型并实施，分维度评价，公司安监部主导对各单位进行安全评估，各单位开展自评价，公司安监部进行现场检查验证评价准确性并优化调整，进行每月排序，对后进者进行考核、鞭策。</div>
  </div>
  <div class="dashed-card">
    <BasicArrowHeader title="各单位安全管理评估模型（区分物业管理和其他管理）" :blockStyle="{width: '97%'}"></BasicArrowHeader>
    <div class="row">
      <div class="col">
        <div class="dashed-card-title">
          项目风险（15分）
        </div>
        <div class="dashed-card-desc">
          难度得分、单位项目安全管理分级情况、安标项目数与可实施安标项目数的比例
        </div>
      </div>
      <div class="col">
        <div class="dashed-card-title">
          周期安全管理（20分）
        </div>
        <div class="dashed-card-desc">
          最近安全监督检查情况、上年度安全绩效考核总体结果排名、连续三年事故情况
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="dashed-card-title">
          领导履职情况（15分）
        </div>
        <div class="dashed-card-desc">
          总经理、安全总监（安全分管领导领导）、业务分管领导
        </div>
      </div>
      <div class="col">
        <div class="dashed-card-title">
          安全文化管理及创新（加分，上限10分）
        </div>
        <div class="dashed-card-desc">
          安全文化管理及创新（公司取得表扬、亮点、创新）
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="dashed-card-title">
          安全管理综合评价（50分）
        </div>
        <div class="dashed-card-desc">
          安监部是否独立及安全管理人员配比、安监部负责人领导力、安监部负责人主动性、人员稳定性、安监部人员能力，专项工作考核、部门协同能力、项目稳定性、管理人员每月考试情况、项目分级覆盖计划及实施，帮扶情况及整改情况。
        </div>
      </div>
      <div class="col">
        <div class="dashed-card-title">
          事故、安全问题投诉、行政处罚（扣分，不设置考核下限）
        </div>
        <div class="dashed-card-desc">
          当年事故、安全问题投诉、行政处罚公司警示及督办情况
        </div>
        <div class="dashed-card-title">
          项目安全评价自评（扣分，下限10分）
        </div>
        <div class="dashed-card-desc">
          单位项目安全评价自评情况（真实性及符合情况）
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicArrowHeader from "./BasicArrowHeader.vue";
export default {
  name: "EstimationMode",
  components: {BasicArrowHeader}
}
</script>

<style scoped>
.h1 {
  font-size: 34px;
  text-align: center;
  font-weight: 800;
}
.h1-desc {
  font-size: 28px;
  line-height: 1.4;
  font-weight: 800;
}
.h1-desc-before::before {
  content: '';
  display: flex;
  border-radius: 50%;
  background-color: #000;
  width: 15px;
  height: 15px;
  margin-right: 40px;
  margin-top: 12px;
}
.h1-desc-box {
  display: flex;
  flex-direction: row;
  background-color: #eee;
  padding: 15px 20px;
  margin-top: 10px;
}
.dashed-card {
  margin: 10px -8px;
  padding: 8px;
  border: 1px dashed #000;
}
.dashed-card-title {
  background-color: #eee;
  margin-top: 10px;
  font-size: 28px;
  padding-left: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-weight: 800;
}
.dashed-card-desc {
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
}
.row {
  display: flex;
}
.row .col + .col{
  margin-left: 50px;
}
.row .col {
  flex: 1;
}
</style>
