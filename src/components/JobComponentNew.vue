<template>
  <div class="row justify-content-between m-1 px-3">
    <div class="col-6 d-flex align-items-center">
      <span class="fw-bold">{{item.jobName}}</span>
    </div>
    <div class="col-6 d-flex justify-content-end align-items-center">
      <span v-if="item.jobPosition == 'Full time'" class="badge bg-light py-2 green" style="border-radius: 5px">{{item.jobPosition}}</span>
      <span v-if="item.jobPosition == 'Freelance'" class="badge bg-light py-2 red" style="border-radius: 5px">{{item.jobPosition}}</span>
      <span v-if="item.jobPosition == 'Internship'" class="badge bg-light py-2 orange" style="border-radius: 5px">{{item.jobPosition}}</span>
      <span v-if="item.jobPosition == 'Contractual'" class="badge bg-light py-2 blue" style="border-radius: 5px">{{item.jobPosition}}</span>
      <span v-if="item.jobPosition == 'Part time'" class="badge bg-light py-2 purple" style="border-radius: 5px">{{item.jobPosition}}</span>


      <div class="dropdown">
        <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          <font-awesome-icon icon="fa-solid fa-ellipsis" class="ps-2 text-muted" /></a>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li></li>
          <button v-if="item.jobStatus !='hidden'" class="dropdown-item" v-on:click="active(item.jobId)">Hidden</button>
          <button v-else disabled class="dropdown-item">Hidden</button>
          <button v-if="item.jobStatus !='visible'" class="dropdown-item"
            v-on:click="visible(item.jobId)">Visible</button>
          <button v-else disabled class="dropdown-item">Visible</button>
        </ul>
      </div>
    </div>
    <div class="col-6">
      <small class="text-muted">Rp{{ formatPrice(item.jobSalary)}},-</small>
    </div>
    <div class="col-6 d-flex justify-content-end">
      <small class="text-muted">x day ago</small>
    </div>
    <div class="col-6">
      <router-link v-if="resp == '0'" :to="{name:'jobdetail', params:{id:item.jobId}}" class="text-muted text-title align-items-center primary text-decoration-none fs-6">{{resp}}
        Applicant
        <img class="import-icon sml mx-1" src="../assets/icon-postjob/arrow-right.svg" alt="">
      </router-link>
      <router-link v-else :to="{name:'jobdetail', params:{id:item.jobId}}" class="text-title align-items-center primary text-decoration-none fs-6">{{resp}}
        Applicant
        <img class="import-icon sml mx-1" src="../assets/icon-postjob/arrow-right.svg" alt="">
      </router-link>
    </div>
    <div class="col-6 d-flex justify-content-end">
      <div class="ict-btn">
        <button data-bs-toggle="modal" :data-bs-target="'#exampleModalToggle' + item.jobId" role="button" v-on:click="getDetail(item.jobId)" class="ict">
          <img class="import-icon" src="../assets/icon-postjob/edit.svg" alt="">
        </button>
          <!-- modal editorData -->
              <div class="modal fade" :id="'exampleModalToggle' + item.jobId" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalToggleLabel">Edit Jobs</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Job Name:</label>
                      <input type="text" class="form-control" id="" v-model="edit.jobName">
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Job Position edit: </label>
                       <select class="form-control" id="inputState" v-model="edit.jobPosition" required>
                        <option selected>Choose..</option>
                        <option>Internship</option>
                        <option>Full time</option>
                        <option>Part Time</option>
                        <option>Contractual</option>
                        <option>Freelance</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Job Address: </label>
                      <input type="text" class="form-control" id="recipient-name" v-model="edit.jobAddress">
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Job Requirement: </label>
                      <!-- <input type="text" class="form-control" id="recipient-name" v-model="edit.jobRequirement"> -->
                      <ckeditor :editor="editor" tag-name="textarea" :model-value="jobDesc" v-model="edit.jobRequirement" :config="editorConfig"></ckeditor>
                    </div>

                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">Job Description:</label>
                      <!-- <textarea class="form-control" id="message-text" v-model="edit.jobDesc" /> -->
                      <ckeditor :editor="editor" tag-name="textarea" :model-value="jobDesc" v-model="edit.jobDesc" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-success" v-on:click="updateJobData(edit.jobId)">Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <button v-on:click="deleteJob(item.jobId)" class="ict dgr">
            <img class="import-icon" src="../assets/icon-postjob/delete.svg" alt="">
          </button>
      </div>
    </div>
    <hr class="mt-4" />
  </div>
  <!-- hidden  -->

</template>

<script>
  import axios from 'axios'
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  export default {
    name: "JobComponent",
    props: ['item', 'id', ],
    data() {
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          // The configuration of the editor.
        },
        edit: [],
        resp:''
      }
    },
    methods: {
      async countTotalAplicant(){
        await axios.get(`http://54.255.4.75:9091/api/v1/application/count-applicants/${this.item.jobId}`)
        .then((data)=>{
          this.resp = data.data.data
          console.log(data.data.data)
        })
      },
      formatPrice(value) {
        let val = (value / 1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      async active(id) {
        try {
          await axios.patch(`http://54.255.4.75:9091/api/v1/job/status/${id}?jobStatus=hidden`)
          // createToast("Job Updated", { type: "success" });
          location.reload(true)
        } catch {
          console.log(Error);
        }
      },
      async visible(id) {
        try {
          await axios.patch(`http://54.255.4.75:9091/api/v1/job/status/${id}?jobStatus=visible`)
          // createToast("Job Updated", { type: "success" });
          location.reload(true)
        } catch {
          console.log(Error);
        }
      },
      async getDetail(jobId) {
        try {
          await axios.get(`http://54.255.4.75:9091/api/v1/job/${jobId}`)
            .then((data) => {
              // this.$emit.edit = data.data.data
              this.edit = data.data.data
              console.log(this.edit)
            })
        } catch {
          console.log(Error)
        }
      },
      async updateJobData(id) {
        try {
          await axios.patch(
            `http://54.255.4.75:9091/api/v1/job/${id}?jobName=${this.edit.jobName}&jobStatus=active&jobSalary=${this.edit.jobSalary}&jobPosition=${this.edit.jobPosition}&jobAddress=${this.edit.jobAddress}&jobDesc=${this.edit.jobDesc}&jobRequirement=${this.edit.jobRequirement}`
          )
          this.$toast.success("Job edited !")
          location.reload(true)
        } catch {
          // console.log(warn)
        }
      },
      async deleteJob(id) {
        try {
          let result = await axios.put(`http://54.255.4.75:9091/api/v1/job/delete/` + id);
          console.warn(result)
          this.$toast.success("Job deleted !")
          location.reload(true)
        } catch {
          console.warn
        }
      }
    },
    mounted() {
      this.getDetail();
      this.countTotalAplicant();
    }
  }
</script>

<style scope>
  /* color for job position */
  .green{
    color: #149E48;
  }
  .blue{
    color: #006EFF;
  }
  .orange{
    color: #FF7A00;
  }
  .red{
    color: #c51313;
  }
  .purple{
    color: #7d21b3;
  }
  /* icon style */
  .import-icon{
    width: 24px;
    height: 24px;
  }
  .sml{
    width: 16px;
    width: 16px;
  }
  /* ==================================== */
  .bdge {
    background: lightblue;
    border-radius: 7px;
    font-size: 12px;
    justify-content: center;
    padding: 3px;
    height: fit-content;
  }
  .text-title {
    display: flex;
    margin-top: 21px;
  }
  .ict-btn {
    background: red;
    height: 0;
    margin-top: 15px;
  }
  .ict {
    margin: 7px;
    border: none;
    background: transparent;
  }
  .dgr {
    color: red;
  }
  .prm {
    color: lightgreen;
  }
</style>