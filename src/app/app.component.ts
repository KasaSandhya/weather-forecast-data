import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  location: any;
  res: any;
  data: any;
  loading: boolean = false;
  title = 'Weather in your city';

  constructor(private httpClient: HttpClient) {}
  
  setLocation(event: any){
    this.location = event.target.value
  }
  searchInfo(){
    if(this.location) {
      this.loading = true
      const geoApi = `http://api.openweathermap.org/geo/1.0/direct?q=${this.location}&limit=5&appid=1635890035cbba097fd5c26c8ea672a1`;
      this.httpClient.get(geoApi).subscribe((response) => {
        console.log("response", response)
      this.res = response;
      console.log("this.res", this.res[0].lat)
        var lat = this.res[0].lat;
        var lon = this.res[0].lon;
        const forecastApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1635890035cbba097fd5c26c8ea672a1`;
        this.httpClient.get(forecastApi).subscribe((response) => {
          
          this.data = response;
          this.loading = false;
          console.log("in second res", this.data?.list)
        });
      });
    }
  }
}
