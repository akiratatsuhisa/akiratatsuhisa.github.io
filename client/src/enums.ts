import _ from 'lodash';

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

export type Enumerable = {
  translation: string;
  value: string;
  icon: string;
};

export const languages: Array<Enumerable> = [
  { translation: 'en', value: 'en', icon: UsFlag },
  { translation: 'vi', value: 'vi', icon: VnFlag },
  { translation: 'ja', value: 'ja', icon: JpFlag },
];

export const mapLanguages = _.fromPairs(
  _.map(languages, (obj) => [obj.value, obj]),
);

export const projectStatus: Array<
  Omit<Enumerable, 'icon'> & { colorSchema: string }
> = [
  { translation: 'initialize', value: 'initialize', colorSchema: 'brand' },
  { translation: 'onGoing', value: 'onGoing', colorSchema: 'blue' },
  { translation: 'maintain', value: 'maintain', colorSchema: 'orange' },
  { translation: 'delay', value: 'delay', colorSchema: 'yellow' },
  { translation: 'cancel', value: 'cancel', colorSchema: 'red' },
  { translation: 'publish', value: 'publish', colorSchema: 'green' },
];

export const mapProjectStatus = _.fromPairs(
  _.map(projectStatus, (obj) => [obj.value, obj]),
);

export const programingLanguages: Array<Enumerable> = [
  { translation: 'csharp', value: 'csharp', icon: CsharpLogo },
  { translation: 'css', value: 'css', icon: CssLogo },
  { translation: 'dart', value: 'dart', icon: DartLogo },
  { translation: 'go', value: 'go', icon: GoLogo },
  { translation: 'html', value: 'html', icon: HtmlLogo },
  { translation: 'javascript', value: 'javascript', icon: JavascriptLogo },
  { translation: 'python', value: 'python', icon: PythonLogo },
  { translation: 'sass', value: 'sass', icon: SassLogo },
  { translation: 'typescript', value: 'typescript', icon: TypescriptLogo },
];

export const mapProgramingLanguages = _.fromPairs(
  _.map(programingLanguages, (obj) => [obj.value, obj]),
);

export const frameworks: Array<Enumerable> = [
  { translation: 'angular', value: 'angular', icon: AngularLogo },
  { translation: 'bootstrap', value: 'bootstrap', icon: BootstrapLogo },
  { translation: 'django', value: 'django', icon: DjangoLogo },
  { translation: 'dotnetcore', value: 'dotnetcore', icon: DotnetcoreLogo },
  { translation: 'express', value: 'express', icon: ExpressLogo },
  { translation: 'flutter', value: 'flutter', icon: FlutterLogo },
  { translation: 'next', value: 'next', icon: NextLogo },
  { translation: 'nest', value: 'nest', icon: NestLogo },
  { translation: 'nodejs', value: 'nodejs', icon: NodejsLogo },
  { translation: 'nuxt', value: 'nuxt', icon: NuxtLogo },
  { translation: 'react', value: 'react', icon: ReactLogo },
  { translation: 'tailwindcss', value: 'tailwindcss', icon: TailwindcssLogo },
  { translation: 'vue', value: 'vue', icon: VueLogo },
];

export const mapFrameworks = _.fromPairs(
  _.map(frameworks, (obj) => [obj.value, obj]),
);

export const databases: Array<Enumerable> = [
  {
    translation: 'elasticsearch',
    value: 'ELASTICSEARCH',
    icon: ElasticsearchLogo,
  },
  { translation: 'mongodb', value: 'mongodb', icon: MongodbLogo },
  { translation: 'mysql', value: 'mysql', icon: MysqlLogo },
  { translation: 'neo4j', value: 'neo4j', icon: Neo4jLogo },
  { translation: 'postgresql', value: 'postgresql', icon: PostgresqlLogo },
  { translation: 'redis', value: 'redis', icon: RedisLogo },
  { translation: 'sqlite', value: 'sqlite', icon: SqliteLogo },
];

export const mapDatabases = _.fromPairs(
  _.map(databases, (obj) => [obj.value, obj]),
);

export const technologies: Array<Enumerable> = [
  { translation: 'aws', value: 'aws', icon: AwsLogo },
  { translation: 'azure', value: 'azure', icon: AzureLogo },
  { translation: 'docker', value: 'docker', icon: DockerLogo },
  { translation: 'eslint', value: 'eslint', icon: EslintLogo },
  { translation: 'figma', value: 'figma', icon: FigmaLogo },
  { translation: 'github', value: 'github', icon: GithubLogo },
  { translation: 'graphql', value: 'graphql', icon: GraphqlLogo },
  { translation: 'nginx', value: 'nginx', icon: NginxLogo },
  { translation: 'socketio', value: 'socketio', icon: SocketioLogo },
];

export const mapTechnologies = _.fromPairs(
  _.map(technologies, (obj) => [obj.value, obj]),
);
