import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  /*
    Verificar o tipo da transação
    Se for income, não faz nada
    Se for outcome, somar todos os incomes subtraido pelos
    outcomes e subtrair pelo resultado. Se resultado < 0, error.

  */

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    // Regra de negócio

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error('Not allowed');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
