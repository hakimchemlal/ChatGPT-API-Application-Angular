import { Component, OnInit } from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, JsonPipe, NgIf, NgForOf],
  styleUrls: ['./gpt.component.css']
})
export class GptComponent implements OnInit {
  queryFormGroup!: FormGroup;
  //first message to send a chatgpt
  messages = [{
    role: "system",
    content: "You are a helpful assistant."
  }];
  response: any;
  error: any;
  showLoader: boolean = false;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.queryFormGroup = this.fb.group({
      query: this.fb.control('')
    });
    }

  handleAskGPT() {
   //console.log('Query:', this.queryFormGroup.value.query);
    this.showLoader = true;

    this.messages.push({
      role: "user",
      content: this.queryFormGroup.value.query
    })
    //se connecter au chatgpt
    let url ="https://api.openai.com/v1/chat/completions";
    //key de lapi
    let key = "sk-proj-PB8lTQGiBCrxksTPRCITT3BlbkFJ2aKNXSxLyQ6zd5DjFpz5";
    //Authorization
    let httpHeaders = new HttpHeaders()
      .set("Authorization", "Bearer "+key)
    let payload = {
      model: 'gpt-3.5-turbo',
      messages: this.messages
    }
    this.httpClient.post(url, payload, {headers: httpHeaders}).subscribe({
      next: (response) => {
        this.response = response;
        console.log('response:', this.response)
        this.response.choices.forEach((choice: any) =>{
          this.messages.push({
            role:"assistant",
            content: choice.message.content
          })
        })
        this.showLoader = false;

      },
      error: (error) => {
        this.error = error.message
        console.log('Error:', error.message)
        this.messages.push({
          role:"assistant",
          content: error.message
        })
        this.showLoader = false;
      }
    })
  }
}
