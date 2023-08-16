import { Body, Controller, Post, Get, Query, Delete } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogadore.interface'

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
        return criarJogadorDto
    }

    @Get()
    async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
        if(email) {
            return await this.jogadoresService.consultarJogadoresPeloEmail(email)
        }
        else {
            return await this.jogadoresService.consultarTodosJogadores()
        }
    }

    @Delete()
    async deletarJogador(@Query('email') email: string){
        if(email) {
            return  this.jogadoresService.deletarJogador(email)
        }
    }
}
