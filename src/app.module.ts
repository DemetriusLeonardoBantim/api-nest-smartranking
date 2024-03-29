import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
    imports: [
        MongooseModule.forRoot(''),
        JogadoresModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}