import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  private familyJSONUrl = 'assets/family.json';
  private maleJsonUrl = 'assets/male.json';
  private femaleJsonUrl = 'assets/female.json';

  genders = [
    'male',
    'female'
  ];

  races = [
    'Dragonborn',
    'Dwarf',
    'Elf',
    'Gnome'
  ];

  familyNames = [];
  firstNames = [];
  displayedFirstName = '';
  displayedFamilyName = '';
  selectedGender = '';
  selectedRace = '';

  constructor(private http: HttpClient) {
    this.selectedGender = 'female';
    this.selectedRace = 'Dragonborn';

    this.getFamilynames().subscribe(data => {
      this.familyNames = data;

    });

    this.getFirstnames(this.selectedGender).subscribe(data => {
      this.firstNames = data;
    });
  }

  ngOnInit() {
  }

  generateNames() {
    this.displayedFamilyName = this.getRandomFamilyName();
    this.displayedFirstName = this.getRandomFirstName();
  }

  getFamilynames(): Observable<any> {
    return this.http.get(this.familyJSONUrl);
  }

  getFirstnames(gender): Observable<any> {
    console.log(gender);
    return gender === 'male' ? this.http.get(this.maleJsonUrl) : this.http.get(this.femaleJsonUrl);
  }

  getRandomFamilyName() {
    const randomNumber = this.returnRandomNumber(50);
    const filteredArray = this.familyNames.filter(item => item.Rasse.includes(this.selectedRace));
    return filteredArray[randomNumber].Name;
  }

  getRandomFirstName() {
    const randomNumber = this.returnRandomNumber(50);
    return this.firstNames[randomNumber].Name;
  }

  returnRandomNumber(maxNumb) {
    const min = 0;
    return Math.floor(Math.random() * (+maxNumb - +min)) + +min;
  }

}
