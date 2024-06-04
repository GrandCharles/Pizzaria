Select * from usuarios

select * From categorias

select * from p

select * from "pedidos"

select * from "pedidosItens"

select pr.codigo,pr.nome,pr.descricao,
os.codigo, os.mesa, os.enviado, os.preparado, os.finalizado, os."nomeCliente",
osi.quantidade 
from "pedidos" as os
inner join "pedidosItens" as osi on osi."idPedido" = os.id
inner join produtos as pr on pr.id = osi."idProduto"
inner join categorias as ct on ct.id = pr."idCategoria"


