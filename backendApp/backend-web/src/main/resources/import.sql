INSERT INTO tb_user (first_name, last_name, email, password,cpf) VALUES ('Alex', 'Brown', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG','95206111404');
INSERT INTO tb_user (first_name, last_name, email, password,cpf) VALUES ('Maria', 'Green', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG','10980910420');

INSERT INTO tb_role (authority) VALUES ('OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_product (name, price, image_Uri, description) VALUES ('Pizza Bacon', 49.9, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/pizza_bacon.jpg', 'Pizza de bacon com mussarela, orégano, molho especial e tempero da casa.');
INSERT INTO tb_product (name, price, image_Uri, description) VALUES ('Pizza Moda da Casa', 59.9, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/pizza_moda.jpg', 'Pizza à moda da casa, com molho especial e todos ingredientes básicos, e queijo à sua escolha.');
INSERT INTO tb_product (name, price, image_Uri, description) VALUES ('Pizza Portuguesa', 45.0, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/pizza_portuguesa.jpg', 'Pizza Portuguesa com molho especial, mussarela, presunto, ovos e especiarias.');
INSERT INTO tb_product (name, price, image_Uri, description) VALUES ('Risoto de Carne', 52.0, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/risoto_carne.jpg', 'Risoto de carne com especiarias e um delicioso molho de acompanhamento.');
INSERT INTO tb_product (name, price, image_Uri, description) VALUES ('Risoto Funghi', 59.95, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/risoto_funghi.jpg', 'Risoto Funghi feito com ingredientes finos e o toque especial do chef.');
INSERT INTO tb_product (name, price, image_Uri, description) VALUES ('Macarrão Espaguete', 35.9, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/macarrao_espaguete.jpg', 'Macarrão fresco espaguete com molho especial e tempero da casa.');
INSERT INTO tb_product (name, price, image_Uri, description) VALUES ('Macarrão Fusili', 38.0, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/macarrao_fusili.jpg', 'Macarrão fusili com toque do chef e especiarias.');
INSERT INTO tb_product (name, price, image_Uri, description) VALUES ('Macarrão Penne', 37.9, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/macarrao_penne.jpg', 'Macarrão penne fresco ao dente com tempero especial.');

INSERT INTO tb_order (status,client_id, latitude, longitude, address, moment,total) VALUES (0, 1,-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T10:00:00Z',20.00);
INSERT INTO tb_order (status,client_id, latitude, longitude, address, moment,total) VALUES (1, 1, -22.946779, -43.217753, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T15:00:00Z',20.00);
INSERT INTO tb_order (status,client_id, latitude, longitude, address, moment,total) VALUES (0, 1,-25.439787, -49.237759, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T16:00:00Z',20.00);
INSERT INTO tb_order (status,client_id, latitude, longitude, address, moment,total) VALUES (0, 1,-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T12:00:00Z',20.00);
INSERT INTO tb_order (status,client_id, latitude, longitude, address, moment,total) VALUES (1, 1,-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T08:00:00Z',20.00);
INSERT INTO tb_order (status,client_id, latitude, longitude, address, moment,total) VALUES (0, 1,-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T14:00:00Z',20.00);
INSERT INTO tb_order (status,client_id, latitude, longitude, address, moment,total) VALUES (0, 1,-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T09:00:00Z',20.00);

INSERT INTO tb_company (name,cnpj,latitude, longitude, address) VALUES ('EBLJ Company','07.818.356/0001-86', -23.561680, -46.656139, 'Avenida Paulista, 1500');

INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,1 , 1);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,1 , 4);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,4,2 , 2);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,4,2 , 5);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,2 , 8);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,3 , 3);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,4,3 , 4);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,4 , 2);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,4 , 6);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,4,5 , 4);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,5 , 6);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,4,6 , 5);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,6 , 1);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,7 , 7);
INSERT INTO tb_order_item (price,quantity, product_id,order_id) VALUES (59.9,2,7 , 5);

INSERT INTO tb_order_product (order_id, product_id) VALUES (1 , 1);
INSERT INTO tb_order_product (order_id, product_id) VALUES (1 , 4);
INSERT INTO tb_order_product (order_id, product_id) VALUES (2 , 2);
INSERT INTO tb_order_product (order_id, product_id) VALUES (2 , 5);
INSERT INTO tb_order_product (order_id, product_id) VALUES (2 , 8);
INSERT INTO tb_order_product (order_id, product_id) VALUES (3 , 3);
INSERT INTO tb_order_product (order_id, product_id) VALUES (3 , 4);
INSERT INTO tb_order_product (order_id, product_id) VALUES (4 , 2);
INSERT INTO tb_order_product (order_id, product_id) VALUES (4 , 6);
INSERT INTO tb_order_product (order_id, product_id) VALUES (5 , 4);
INSERT INTO tb_order_product (order_id, product_id) VALUES (5 , 6);
INSERT INTO tb_order_product (order_id, product_id) VALUES (6 , 5);
INSERT INTO tb_order_product (order_id, product_id) VALUES (6 , 1);
INSERT INTO tb_order_product (order_id, product_id) VALUES (7 , 7);
INSERT INTO tb_order_product (order_id, product_id) VALUES (7 , 5);

