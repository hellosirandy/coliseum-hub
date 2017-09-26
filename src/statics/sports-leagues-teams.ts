import { Sport } from '../models/sport';
import { League } from '../models/league';
import { Team } from '../models/team';

export const Sports:Sport[] = [
  <Sport>{name: 'baseball', logo: 'assets/images/baseball.png'},
  <Sport>{name: 'football', logo: 'assets/images/football.png'},
  <Sport>{name: 'basketball', logo: 'assets/images/basketball.png'},
  <Sport>{name: 'hockey', logo: 'assets/images/hockey.png'},
]

export const Leagues = {
  baseball:<League[]> [
    <League>{name: 'MLB', logo: 'assets/images/logos/mlb.png'},
    <League>{name: 'NPB', logo: 'assets/images/logos/npb.png'},
  ],
  football:<League[]> [
    <League>{name: 'NFL', logo: 'assets/images/logos/nfl.png'},
    <League>{name: 'Premier_League', logo: 'assets/images/logos/premier_league.png'},
  ],
  basketball:<League[]> [
    <League>{name: 'NBA', logo: 'assets/images/logos/nba.png'},
  ],
  hockey:<League[]> [
    <League>{name: 'NHL', logo: 'assets/images/logos/nhl.png'},
  ],
};

export const Teams = {
  MLB:<Team[]> [
    <Team>{name: 'Red Sox', logo: '', location: 'Boston'},
    <Team>{name: 'Yankees', logo: '', location: 'New York'},
    <Team>{name: 'Blue Jays', logo: '', location: 'Toronto'},
    <Team>{name: 'Rays', logo: '', location: 'Tampa Bay'},
    <Team>{name: 'Orioles', logo: '', location: 'Baltimore'},
    <Team>{name: 'White Sox', logo: '', location: 'Chicago'},
    <Team>{name: 'Indians', logo: '', location: 'Cleveland'},
    <Team>{name: 'Royals', logo: '', location: 'Kansas City'},
    <Team>{name: 'Twins', logo: '', location: 'Minnesota'},
    <Team>{name: 'Tigers', logo: '', location: 'Detroit'},
    <Team>{name: 'Angels', logo: '', location: 'Los Angelas'},
    <Team>{name: 'Astros', logo: '', location: 'Houston'},
    <Team>{name: 'Athletics', logo: '', location: 'Oakland'},
    <Team>{name: 'Mariners', logo: '', location: 'Seattle'},
    <Team>{name: 'Rangers', logo: '', location: 'Texas'},
    <Team>{name: 'Nationals', logo: '', location: 'Washington'},
    <Team>{name: 'Mets', logo: '', location: 'New York'},
    <Team>{name: 'Phillies', logo: '', location: 'Philadelphia'},
    <Team>{name: 'Braves', logo: '', location: 'Atlanta'},
    <Team>{name: 'Marlins', logo: '', location: 'Miami'},
    <Team>{name: 'Pirates', logo: '', location: 'Pittsburgh'},
    <Team>{name: 'Cubs', logo: '', location: 'Chicago'},
    <Team>{name: 'Brewers', logo: '', location: 'Milwaukee'},
    <Team>{name: 'Cardinals', logo: '', location: 'St. Louis'},
    <Team>{name: 'Reds', logo: '', location: 'Cincinnati'},
    <Team>{name: 'Dodgers', logo: '', location: 'Los Angelas'},
    <Team>{name: 'Diamondbacks', logo: '', location: 'Arizona'},
    <Team>{name: 'Rockies', logo: '', location: 'Colorado'},
    <Team>{name: 'Giants', logo: '', location: 'San Francisco'},
    <Team>{name: 'Padres', logo: '', location: 'San Diego'},
  ],
  NPB: <Team[]> [
    <Team>{name: 'Yomiuri Giants', logo: ''},
    <Team>{name: 'Hiroshima Toyo Carp', logo: ''},
    <Team>{name: 'YOKOHAMA DeNA BAYSTARS', logo: ''},
    <Team>{name: 'Hanshin Tigers', logo: ''},
    <Team>{name: 'Tokyo Yakult Swallows', logo: ''},
    <Team>{name: 'Chunichi Dragons', logo: ''},
    <Team>{name: 'Hokkaido Nippon-Ham Fighters', logo: ''},
    <Team>{name: 'Fukuoka SoftBank Hawks', logo: ''},
    <Team>{name: 'Chiba Lotte Marines', logo: ''},
    <Team>{name: 'Saitama Seibu Lions', logo: ''},
    <Team>{name: 'Tohoku Rakuten Golden Eagles', logo: ''},
    <Team>{name: 'ORIX Buffaloes', logo: ''},
  ],
  NFL: <Team[]> [
    <Team>{name: 'Falcons', logo: '', location: 'Atlanta'},
    <Team>{name: 'Cardinals', logo: '', location: 'Arizona'},
    <Team>{name: 'Ravens', logo: '', location: 'Baltimore'},
    <Team>{name: 'Bills', logo: '', location: 'Buffalo'},
    <Team>{name: 'Panthers', logo: '', location: 'Carolina'},
    <Team>{name: 'Bears', logo: '', location: 'Chicago'},
    <Team>{name: 'Bengals', logo: '', location: 'Cincinnati'},
    <Team>{name: 'Browns', logo: '', location: 'Cleveland'},
    <Team>{name: 'Cowboys', logo: '', location: 'Dallas'},
    <Team>{name: 'Broncos', logo: '', location: 'Denver'},
    <Team>{name: 'Lions', logo: '', location: 'Detroit'},
    <Team>{name: 'Packers', logo: '', location: 'Green Bay'},
    <Team>{name: 'Texons', logo: '', location: 'Houston'},
    <Team>{name: 'Colts', logo: '', location: 'Indianapolis'},
    <Team>{name: 'Jaguars', logo: '', location: 'Jacksonville'},
    <Team>{name: 'Chiefs', logo: '', location: 'Kansas City'},
    <Team>{name: 'Chargers', logo: '', location: 'Los Angelas'},
    <Team>{name: 'Rams', logo: '', location: 'Los Angelas'},
    <Team>{name: 'Dolphins', logo: '', location: 'Miami'},
    <Team>{name: 'Vikings', logo: '', location: 'Minnesota'},
    <Team>{name: 'Patriots', logo: '', location: 'New England'},
    <Team>{name: 'Saints', logo: '', location: 'New Orleans'},
    <Team>{name: 'Giants', logo: '', location: 'New York'},
    <Team>{name: 'Jets', logo: '', location: 'New York'},
    <Team>{name: 'Raiders', logo: '', location: 'Oakland'},
    <Team>{name: 'Steelers', logo: '', location: 'Pittsburgh'},
    <Team>{name: '49ers', logo: '', location: 'San Francisco'},
    <Team>{name: 'Seahawks', logo: '', location: 'Seattle'},
    <Team>{name: 'Buccaneers', logo: '', location: 'Tampa Bay'},
    <Team>{name: 'Titans', logo: '', location: 'Tennessee'},
    <Team>{name: 'Redskins', logo: '', location: 'Washington'},
  ],
  NBA: <Team[]> [
    <Team>{name: 'Hawks', logo: '', location: 'Atlanta'},
    <Team>{name: 'Celtics', logo: '', location: 'Boston'},
    <Team>{name: 'Nets', logo: '', location: 'Brooklyn'},
    <Team>{name: 'Hornets', logo: '', location: 'Charlette'},
    <Team>{name: 'Bulls', logo: '', location: 'Chicago'},
    <Team>{name: 'Caviliers', logo: '', location: 'Cleveland'},
    <Team>{name: 'Mavericks', logo: '', location: 'Dallas'},
    <Team>{name: 'Nuggets', logo: '', location: 'Denver'},
    <Team>{name: 'Pistons', logo: '', location: 'Detroit'},
    <Team>{name: 'Warrios', logo: '', location: 'Golden State'},
    <Team>{name: 'Rockets', logo: '', location: 'Houston'},
    <Team>{name: 'Pacers', logo: '', location: 'Indiana'},
    <Team>{name: 'Clippers', logo: '', location: 'Los Angelas'},
    <Team>{name: 'Lakers', logo: '', location: 'Los Angelas'},
    <Team>{name: 'Grizzlies', logo: '', location: 'Memphis'},
    <Team>{name: 'Heat', logo: '', location: 'Miami'},
    <Team>{name: 'Bucks', logo: '', location: 'Milwaukee'},
    <Team>{name: 'Timberwolves', logo: '', location: 'Minnesota'},
    <Team>{name: 'Pelicans', logo: '', location: 'New Orleans'},
    <Team>{name: 'Knicks', logo: '', location: 'New York'},
    <Team>{name: 'Thunder', logo: '', location: 'Oaklahoma City'},
    <Team>{name: 'Magic', logo: '', location: 'Orlando'},
    <Team>{name: '76ers', logo: '', location: 'Philadelphia'},
    <Team>{name: 'Suns', logo: '', location: 'Phoenix'},
    <Team>{name: 'Trail Blazers', logo: '', location: 'Portland'},
    <Team>{name: 'Kings', logo: '', location: 'Sacramento'},
    <Team>{name: 'Spurs', logo: '', location: 'San Antonio'},
    <Team>{name: 'Raptors', logo: '', location: 'Toronto'},
    <Team>{name: 'Jazz', logo: '', location: 'Utah'},
    <Team>{name: 'Wizards', logo: '', location: 'Washington'},
  ],
  NHL: <Team[]> [
    <Team>{name: 'Hurricans', logo: '', location: 'Carolina'},
    <Team>{name: 'Blue Jackets', logo: '', location: 'Columbus'},
    <Team>{name: 'Devils', logo: '', location: 'New Jersey'},
    <Team>{name: 'Islanders', logo: '', location: 'New York'},
    <Team>{name: 'Rangers', logo: '', location: 'New York'},
    <Team>{name: 'Flyers', logo: '', location: 'Philadelphia'},
    <Team>{name: 'Penguins', logo: '', location: 'Pittsburgh'},
    <Team>{name: 'Capitals', logo: '', location: 'Washington'},
    <Team>{name: 'Bruins', logo: '', location: 'Boston'},
    <Team>{name: 'Sabres', logo: '', location: 'Buffalo'},
    <Team>{name: 'Red Wings', logo: '', location: 'Detroit'},
    <Team>{name: 'Panthers', logo: '', location: 'Florida'},
    <Team>{name: 'Canadiens', logo: '', location: 'Montréal'},
    <Team>{name: 'Senators', logo: '', location: 'Ottawa'},
    <Team>{name: 'Lightning', logo: '', location: 'Tampa Bay'},
    <Team>{name: 'Maple Leafs', logo: '', location: 'Toronto'},
    <Team>{name: 'Blackhawks', logo: '', location: 'Chicago'},
    <Team>{name: 'Avalanche', logo: '', location: 'Colorado'},
    <Team>{name: 'Stars', logo: '', location: 'Dallas'},
    <Team>{name: 'Wild', logo: '', location: 'Minnesota'},
    <Team>{name: 'Predators', logo: '', location: 'Nashville'},
    <Team>{name: 'Blues', logo: '', location: 'St. Louis'},
    <Team>{name: 'Jets', logo: '', location: 'Winnipeg'},
    <Team>{name: 'Ducks', logo: '', location: 'Anaheim'},
    <Team>{name: 'Coyotes', logo: '', location: 'Arizona'},
    <Team>{name: 'Flames', logo: '', location: 'Calgary'},
    <Team>{name: 'Oilers', logo: '', location: 'Edmonton'},
    <Team>{name: 'Kings', logo: '', location: 'Los Angelas'},
    <Team>{name: 'Sharks', logo: '', location: 'San Jose'},
    <Team>{name: 'Canucks', logo: '', location: 'Vancouver'},
    <Team>{name: 'Golden Knights', logo: '', location: 'Vegas'},
  ],
  Premier_League: <Team[]> [
    <Team>{name: 'AFC Bournemouth', logo: '', location: ''},
    <Team>{name: 'Arsenal', logo: '', location: ''},
    <Team>{name: 'Brighton & Hove Albion	', logo: '', location: ''},
    <Team>{name: 'Burnley', logo: '', location: ''},
    <Team>{name: 'Chelsea', logo: '', location: ''},
    <Team>{name: 'Crystal Palace', logo: '', location: ''},
    <Team>{name: 'Everton', logo: '', location: ''},
    <Team>{name: 'Huddersfield Town', logo: '', location: ''},
    <Team>{name: 'Leicester City', logo: '', location: ''},
    <Team>{name: 'Liverpool', logo: '', location: ''},
    <Team>{name: 'Manchester City', logo: '', location: ''},
    <Team>{name: 'Manchester United', logo: '', location: ''},
    <Team>{name: 'Newcastle United', logo: '', location: ''},
    <Team>{name: 'Southampton', logo: '', location: ''},
    <Team>{name: 'Stoke City', logo: '', location: ''},
    <Team>{name: 'Swansea City', logo: '', location: ''},
    <Team>{name: 'Tottenham Hotspur', logo: '', location: ''},
    <Team>{name: 'Watford', logo: '', location: ''},
    <Team>{name: 'West Bromwich Albion', logo: '', location: ''},
    <Team>{name: 'West Ham United', logo: '', location: ''},
  ]
}
