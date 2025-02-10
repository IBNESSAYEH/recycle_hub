import { Component } from '@angular/core';
import { NewsItem } from '../../models/news-item';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-bank-news',
  imports: [NgStyle],
  standalone: true,
  templateUrl: './bank-news.component.html',
  styleUrl: './bank-news.component.css'
})
export class BankNewsComponent {
  newsData: NewsItem[] = [
    {
      category: "MAIN FACILITY",
      title: "Our Central Recycling Hub",
      description: "Discover our state-of-the-art recycling facility, equipped with the latest technology to process and manage waste efficiently and sustainably.",
      imageUrl: "assets/images/1.png",
      buttonText: "Visit Our Hub",
      buttonColor: "#1a365d",
      gradient: "linear-gradient(to right, #1a365d, #2b4c7e)"
    },
    {
      category: "LOCAL BRANCHES",
      title: "Neighborhood Recycling Centers",
      description: "Find your nearest recycling center. We're expanding our network of local branches to make recycling more accessible to everyone in the community.",
      imageUrl: "assets/images/2.png",
      buttonText: "Find Nearest Center",
      buttonColor: "#2f855a",
      gradient: "linear-gradient(to right, #2f855a, #48bb78)"
    },
    {
      category: "COLLECTION POINTS",
      title: "Street Recycling Bins",
      description: "Our strategically placed recycling bins make it easy to dispose of waste responsibly. Check out our smart bin locations across the city.",
      imageUrl: "assets/images/3.png",
      buttonText: "Locate Bins",
      buttonColor: "#744210",
      gradient: "linear-gradient(to right, #744210, #975a16)"
    },
    {
      category: "MOBILE APP",
      title: "RecycleHub Mobile",
      description: "Download our mobile app to locate recycling points, track your recycling impact, and earn rewards for your environmental contributions.",
      imageUrl: "assets/images/4.png",
      buttonText: "Download App",
      buttonColor: "#2b6cb0",
      gradient: "linear-gradient(to right, #2b6cb0, #4299e1)"
    },
    {
      category: "ONLINE PLATFORM",
      title: "Digital Recycling Management",
      description: "Access our comprehensive online platform to schedule pickups, monitor your recycling statistics, and learn about sustainable practices.",
      imageUrl: "assets/images/5.png",
      buttonText: "Start Managing",
      buttonColor: "#702459",
      gradient: "linear-gradient(to right, #702459, #97266d)"
    },
    {
      category: "SMART BINS",
      title: "Intelligent Waste Collection",
      description: "Our smart bins use IoT technology to optimize collection routes and ensure efficient waste management across the city.",
      imageUrl: "assets/images/6.png",
      buttonText: "Learn About Smart Bins",
      buttonColor: "#285e61",
      gradient: "linear-gradient(to right, #285e61, #319795)"
    },
    {
      category: "COMMUNITY RECYCLING",
      title: "Neighborhood Collection Points",
      description: "Join our community recycling initiative. Find convenient collection points in your neighborhood and help create a cleaner environment.",
      imageUrl: "assets/images/7.png",
      buttonText: "Join Initiative",
      buttonColor: "#285e61",
      gradient: "linear-gradient(to right, #285e61, #319795)"
    }
  ]
}
