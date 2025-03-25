import { Component, inject, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { RouterModule } from '@angular/router';
import { HomeAlbums, HomeSongs } from '../../interfaces/data.interface';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../shared/signals/message.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  albums: HomeAlbums[] = [];
  songs: HomeSongs[] = [];

  private readonly loadingService = inject(LoadingService);
  private readonly apiService = inject(ApiService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.loadingService.show();
    this.apiService.request('GET', 'info/home-info', null).subscribe(res => {
      this.loadingService.hide();
      this.albums = res.featuredAlbums;
      this.songs = res.trendingSongs;
    });
  }

  changeSong(songId: string) {
    console.log('🚀 ~ HomeComponent ~ changeSong ~ songId:', songId);
    this.messageService.changeSongId(songId);
  }
}
