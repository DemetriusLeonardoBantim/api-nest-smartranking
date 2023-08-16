import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogadore.interface'
import {v4 as uuid} from 'uuid'

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name)
    private jogadores: Jogador[] = []

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = criarJogadorDto

        const jogadorEncontrado = await this.jogadores.find((x) => x.email === email)

        if(jogadorEncontrado) {
            return await this.atualizar(jogadorEncontrado, criarJogadorDto)
        }
        else {
            await this.criar(criarJogadorDto)
        }

    }

    private criar(criarJogadorDto: CriarJogadorDto): void{
        const { nome, email, telefoneCelular } = criarJogadorDto
        const  jogador: Jogador = {
            _id: uuid(),
            nome,
            email,
            telefoneCelular,
            posicaoRanking: '1',
            ranking: 'A',
            urlFotoJogador: 'url_foto',
        }
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador)
    }

    async consultarTodosJogadores(){
        return this.jogadores
    }

    private async atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { nome } = jogadorEncontrado

        jogadorEncontrado.nome = nome
        
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
        if(jogadorEncontrado) return jogadorEncontrado
        else throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
    
    }

    async deletarJogador(email: string): Promise<String>{
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
        this.jogadores = this.jogadores.filter(jogador => jogadorEncontrado.email !== jogador.email)
        return 'Jogador deletado com sucesso.'
    }
}
