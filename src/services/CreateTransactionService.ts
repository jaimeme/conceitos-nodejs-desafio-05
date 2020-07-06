import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    // TODO
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error('You do not have enough balance');
    }

    if (type === 'income' || type === 'outcome') {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transaction;
    }

    throw Error('Type not found, try income or outcome');
  }
  // Fiz assim pq eu não consegui fazer o contrário, que seria throw Error() dentro do if com comparação de !==
}

export default CreateTransactionService;
