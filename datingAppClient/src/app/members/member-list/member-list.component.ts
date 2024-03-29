import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members$!: Observable<Member[]>;
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    // this._loadMembers();
    this.members$ = this.memberService.getMembers();
  }

  // private _loadMembers() {
  //   this.memberService.getMembers().subscribe({
  //     next: (members: Member[]) => {
  //       console.log("users", members);
  //       this.members = members;
  //     },
  //     error: (error) => {
  //       console.log("error", error);
  //     }
  //   })
  // }
}
