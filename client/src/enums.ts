import _ from 'lodash';
import {
  Database,
  Framework,
  Language,
  LanguageCode,
  ProjectStatus,
  Technology,
} from 'shared';

import JpFlag from '@/assets/flags/jp.svg';
import UsFlag from '@/assets/flags/us.svg';
import VnFlag from '@/assets/flags/vn.svg';
import ElasticsearchLogo from '@/assets/programing/databases/elasticsearch.svg';
import MongodbLogo from '@/assets/programing/databases/mongodb.svg';
import MysqlLogo from '@/assets/programing/databases/mysql.svg';
import Neo4jLogo from '@/assets/programing/databases/neo4j.svg';
import PostgresqlLogo from '@/assets/programing/databases/postgresql.svg';
import RedisLogo from '@/assets/programing/databases/redis.svg';
import SqliteLogo from '@/assets/programing/databases/sqlite.svg';
import AngularLogo from '@/assets/programing/frameworks/angular.svg';
import BootstrapLogo from '@/assets/programing/frameworks/bootstrap.svg';
import DjangoLogo from '@/assets/programing/frameworks/django.svg';
import DotnetcoreLogo from '@/assets/programing/frameworks/dotnetcore.svg';
import ExpressLogo from '@/assets/programing/frameworks/express.svg';
import FlutterLogo from '@/assets/programing/frameworks/flutter.svg';
import NestLogo from '@/assets/programing/frameworks/nest.svg';
import NextLogo from '@/assets/programing/frameworks/next.svg';
import NodejsLogo from '@/assets/programing/frameworks/nodejs.svg';
import NuxtLogo from '@/assets/programing/frameworks/nuxt.svg';
import ReactLogo from '@/assets/programing/frameworks/react.svg';
import TailwindcssLogo from '@/assets/programing/frameworks/tailwindcss.svg';
import VueLogo from '@/assets/programing/frameworks/vue.svg';
import CsharpLogo from '@/assets/programing/languages/csharp.svg';
import CssLogo from '@/assets/programing/languages/css.svg';
import DartLogo from '@/assets/programing/languages/dart.svg';
import GoLogo from '@/assets/programing/languages/go.svg';
import HtmlLogo from '@/assets/programing/languages/html.svg';
import JavascriptLogo from '@/assets/programing/languages/javascript.svg';
import PythonLogo from '@/assets/programing/languages/python.svg';
import SassLogo from '@/assets/programing/languages/sass.svg';
import TypescriptLogo from '@/assets/programing/languages/typescript.svg';
import AwsLogo from '@/assets/programing/technologies/aws.svg';
import AzureLogo from '@/assets/programing/technologies/azure.svg';
import DockerLogo from '@/assets/programing/technologies/docker.svg';
import EslintLogo from '@/assets/programing/technologies/eslint.svg';
import FigmaLogo from '@/assets/programing/technologies/figma.svg';
import GithubLogo from '@/assets/programing/technologies/github.svg';
import GraphqlLogo from '@/assets/programing/technologies/graphql.svg';
import NginxLogo from '@/assets/programing/technologies/nginx.svg';
import SocketioLogo from '@/assets/programing/technologies/socketio.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Enumerable<T = any> = {
  value: T;
  icon: string;
};

export const languages: Array<Enumerable<LanguageCode>> = [
  {
    value: LanguageCode.English,
    icon: UsFlag,
  },
  {
    value: LanguageCode.Vietnamese,
    icon: VnFlag,
  },
  {
    value: LanguageCode.Japaneses,
    icon: JpFlag,
  },
];

export const mapLanguages = _.fromPairs(
  _.map(languages, (obj) => [obj.value, obj]),
);

export const projectStatus: Array<
  Omit<Enumerable<ProjectStatus>, 'icon'> & { colorSchema: string }
> = [
  { value: ProjectStatus.Initialize, colorSchema: 'brand' },
  { value: ProjectStatus.OnGoing, colorSchema: 'blue' },
  { value: ProjectStatus.Maintain, colorSchema: 'orange' },
  { value: ProjectStatus.Delay, colorSchema: 'yellow' },
  { value: ProjectStatus.Cancel, colorSchema: 'red' },
  { value: ProjectStatus.Publish, colorSchema: 'green' },
];

export const mapProjectStatus = _.fromPairs(
  _.map(projectStatus, (obj) => [obj.value, obj]),
);

export const programingLanguages: Array<Enumerable<Language>> = [
  { value: Language.CSharp, icon: CsharpLogo },
  { value: Language.CSS, icon: CssLogo },
  { value: Language.Dart, icon: DartLogo },
  { value: Language.Go, icon: GoLogo },
  { value: Language.Html, icon: HtmlLogo },
  { value: Language.Javascript, icon: JavascriptLogo },
  { value: Language.Python, icon: PythonLogo },
  { value: Language.Sass, icon: SassLogo },
  { value: Language.Typescript, icon: TypescriptLogo },
];

export const mapProgramingLanguages = _.fromPairs(
  _.map(programingLanguages, (obj) => [obj.value, obj]),
);

export const frameworks: Array<Enumerable<Framework>> = [
  { value: Framework.Angular, icon: AngularLogo },
  { value: Framework.Bootstrap, icon: BootstrapLogo },
  { value: Framework.Django, icon: DjangoLogo },
  { value: Framework.Dotnetcore, icon: DotnetcoreLogo },
  { value: Framework.Express, icon: ExpressLogo },
  { value: Framework.Flutter, icon: FlutterLogo },
  { value: Framework.Next, icon: NextLogo },
  { value: Framework.Nest, icon: NestLogo },
  { value: Framework.Nodejs, icon: NodejsLogo },
  { value: Framework.Nuxt, icon: NuxtLogo },
  { value: Framework.React, icon: ReactLogo },
  { value: Framework.Tailwindcss, icon: TailwindcssLogo },
  { value: Framework.Vue, icon: VueLogo },
];

export const mapFrameworks = _.fromPairs(
  _.map(frameworks, (obj) => [obj.value, obj]),
);

export const databases: Array<Enumerable<Database>> = [
  { value: Database.Elasticsearch, icon: ElasticsearchLogo },
  { value: Database.Mongodb, icon: MongodbLogo },
  { value: Database.Mysql, icon: MysqlLogo },
  { value: Database.Neo4j, icon: Neo4jLogo },
  { value: Database.Postgresql, icon: PostgresqlLogo },
  { value: Database.Redis, icon: RedisLogo },
  { value: Database.Sqlite, icon: SqliteLogo },
];

export const mapDatabases = _.fromPairs(
  _.map(databases, (obj) => [obj.value, obj]),
);

export const technologies: Array<Enumerable<Technology>> = [
  { value: Technology.Aws, icon: AwsLogo },
  { value: Technology.Azure, icon: AzureLogo },
  { value: Technology.Docker, icon: DockerLogo },
  { value: Technology.Eslint, icon: EslintLogo },
  { value: Technology.Figma, icon: FigmaLogo },
  { value: Technology.Github, icon: GithubLogo },
  { value: Technology.Graphql, icon: GraphqlLogo },
  { value: Technology.Nginx, icon: NginxLogo },
  { value: Technology.Socketio, icon: SocketioLogo },
];

export const mapTechnologies = _.fromPairs(
  _.map(technologies, (obj) => [obj.value, obj]),
);
