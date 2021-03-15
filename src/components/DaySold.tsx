import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTitleContext } from "../hooks/TitleProvider";
import useApi from "../hooks/useApi";
import useDate from "../hooks/useDate";
import { useNotificationContext } from "../hooks/NotificationProvider";
import DaySoldDto from "../models/DaySoldDto";
import {
  Spin,
  Input,
  Button,
  Form,
  Space,
  Select,
  Divider,
  Drawer
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ProductDto, { ProductViewDto } from "../models/ProductDto";
import { FormListFieldData } from "antd/lib/form/FormList";

interface ProductGroup {
  category: string;
  items: ProductViewDto[];
}

const DaySold: React.FC = () => {
  const { toDateString } = useDate();
  const [date] = useState(new Date().toISOString());
  const [dto, setDto] = useLocalStorage<DaySoldDto>(
    `daySold.${toDateString(date)}`,
    {
      items: [
        {
          id: 1,
          name: "Ruže",
          productId: 1,
          quantity: 5
        }
      ]
    }
  );
  const [isSubmitting, setSubmitting] = useState(false);
  const [newProductField, setNewProductField] = useState<FormListFieldData>();
  const [products, setProducts] = useState<ProductViewDto[]>([]);
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const { setTitle } = useTitleContext();
  const { apiGet, apiPost } = useApi();
  const { handleError } = useNotificationContext();
  const [newProductForm] = Form.useForm();
  const [form] = Form.useForm();

  useEffect(() => {
    setTitle("Prodato");
  }, []);

  useEffect(() => {
    if (newProductField) return;

    apiGet<ProductViewDto[]>("product/getall")
      .then(setProducts)
      .catch(handleError)
      .finally(() => setSubmitting(false));
  }, [newProductField]);

  useEffect(() => {
    setProductGroups(
      products.reduce<ProductGroup[]>((res, cur) => {
        const group = res.find(r => r.category === cur.category);
        if (group) group.items.push(cur);
        else {
          res.push({ category: cur.category, items: [cur] });
        }
        return res;
      }, [])
    );
  }, [products]);

  useEffect(() => {
    if (dto) return;

    console.log(dto);
    setSubmitting(true);
    apiGet<DaySoldDto>(`daySold?date=${toDateString(date)}`)
      .then(d => {
        if (d) setDto(d);
        else
          setDto({
            items: [
              {
                id: 1,
                name: "Ruže",
                productId: 1,
                quantity: 5
              }
            ]
          });
      })
      .catch(handleError)
      .finally(() => setSubmitting(false));
  }, []);

  const saveData = (dto: DaySoldDto) => {
    setSubmitting(true);
    apiPost(`daySold?date=${toDateString(date)}`, dto)
      .then(() => setDto(null))
      .catch(handleError)
      .finally(() => setSubmitting(false));
  };

  const saveNewProduct = (product: ProductDto) => {
    setSubmitting(true);
    apiPost<number>("product/create", product)
      .then(id => {
        if (!newProductField) return;

        console.log(newProductField);
        const values = form.getFieldsValue() as DaySoldDto;
        values.items[newProductField.name].productId = id;
        form.setFieldsValue(values);

        setNewProductField(undefined);
      })
      .catch(handleError)
      .finally(() => setSubmitting(false));
  };

  return (
    <Spin spinning={isSubmitting} tip="Učitavanje...">
      {dto && (
        <Form
          form={form}
          onFinish={saveData}
          initialValues={dto}
          onChange={() => {}}
          layout="vertical"
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "id"]}
                      fieldKey={[field.fieldKey, "id"]}
                      hidden
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "product"]}
                      fieldKey={[field.fieldKey, "product"]}
                      label="Prozivod"
                      rules={[{ required: true }]}
                    >
                      <Select
                        dropdownRender={menu => (
                          <div>
                            {menu}
                            <Divider style={{ margin: "4px 0" }} />
                            <a
                              style={{
                                flex: "none",
                                padding: "8px",
                                display: "block",
                                cursor: "pointer"
                              }}
                              onClick={() => setNewProductField(field)}
                            >
                              <PlusOutlined /> Dodaj novi proizvod
                            </a>
                          </div>
                        )}
                      >
                        {productGroups.map(g => (
                          <Select.OptGroup key={g.category} label={g.category}>
                            {g.items.map(product => (
                              <Select.Option
                                key={product.id}
                                value={product.id}
                              >
                                {product.name}
                              </Select.Option>
                            ))}
                          </Select.OptGroup>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "quantity"]}
                      fieldKey={[field.fieldKey, "quantity"]}
                      label="Količina"
                      rules={[
                        { required: true, message: "Količina je obavezna" }
                      ]}
                    >
                      <Input placeholder="Unesite količinu" type="number" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "unit"]}
                      fieldKey={[field.fieldKey, "unit"]}
                      label="Jedinica"
                    >
                      <Input readOnly />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={add}
                    block
                    icon={<PlusOutlined />}
                  >
                    Dodaj
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sačuvaj
            </Button>
          </Form.Item>
        </Form>
      )}
      <Drawer
        title="Napravi novi proizvod"
        getContainer={false}
        onClose={() => setNewProductField(undefined)}
        visible={newProductField !== undefined}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right"
            }}
          >
            <Button
              onClick={() => setNewProductField(undefined)}
              style={{ marginRight: 8 }}
              loading={isSubmitting}
            >
              Odustani
            </Button>
            <Button
              onClick={newProductForm.submit}
              type="primary"
              loading={isSubmitting}
            >
              Sačuvaj
            </Button>
          </div>
        }
      >
        <Form layout="vertical" form={newProductForm} onFinish={saveNewProduct}>
          <Form.Item
            name="name"
            label="Naziv proizvoda"
            rules={[{ required: true, message: "Naziv je obavezan" }]}
          >
            <Input placeholder="Molimo unesite naziv proizvoda" />
          </Form.Item>
        </Form>
      </Drawer>
    </Spin>
  );
};

export default DaySold;
